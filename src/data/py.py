import pandas as pd
import json
import re

# ========= CONFIG =========
excel_file = "input.xlsx"   # <-- Put your excel file name here
output_json = "timetable.json"
# ===========================

def detect_type(subject):
    """
    Detect Lab or Theory
    """
    if subject is None:
        return "Theory"
    
    subject = str(subject).lower()
    
    if "lab" in subject or subject.strip() == "l":
        return "Lab"
    else:
        return "Theory"


def extract_faculty_info(df):
    """
    Extract faculty details from top rows
    """
    faculty_data = {
        "Name": "",
        "Contact": "",
        "Designation": ""
    }
    
    full_text = df.to_string()
    
    name_match = re.search(r'Faculty Name\s*:\s*(.*?)\s{2,}', full_text)
    contact_match = re.search(r'Contact\s*:\s*(\d+)', full_text)
    designation_match = re.search(r'Designation\s*:\s*(.*)', full_text)
    
    if name_match:
        faculty_data["Name"] = name_match.group(1).strip()
    
    if contact_match:
        faculty_data["Contact"] = contact_match.group(1).strip()
    
    if designation_match:
        faculty_data["Designation"] = designation_match.group(1).strip()
    
    return faculty_data


def process_sheet(df):
    timetable = []
    
    # Remove completely empty rows
    df = df.dropna(how='all')
    
    for index, row in df.iterrows():
        row_data = row.tolist()
        
        if pd.isna(row_data[0]):
            continue
        
        day = str(row_data[0]).strip()
        
        if day.lower() in ["mon", "tue", "wed", "thu", "fri", "sat"]:
            
            for col_index in range(2, len(row_data)):
                cell = row_data[col_index]
                
                if pd.notna(cell):
                    text = str(cell).strip()
                    
                    entry = {
                        "Day": day,
                        "Period": col_index - 1,
                        "Details": text,
                        "Type": detect_type(text)
                    }
                    
                    timetable.append(entry)
    
    return timetable


def main():
    xls = pd.ExcelFile(excel_file)
    
    final_output = {
        "Faculty": {},
        "Sheets": {}
    }
    
    for sheet_name in xls.sheet_names:
        df = pd.read_excel(xls, sheet_name=sheet_name, header=None)
        
        # Extract faculty info only once
        if not final_output["Faculty"]:
            final_output["Faculty"] = extract_faculty_info(df)
        
        sheet_data = process_sheet(df)
        final_output["Sheets"][sheet_name] = sheet_data
    
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(final_output, f, indent=4)
    
    print("✅ JSON file created successfully:", output_json)


if __name__ == "__main__":
    main()