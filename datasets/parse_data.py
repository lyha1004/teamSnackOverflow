import pandas as pd

excel_file_path = 'Conoco_Phillips.xlsx'

excel_data = pd.read_excel(excel_file_path, engine='openpyxl')  

json_str = excel_data.to_json()

print('Excel Data:\n', json_str)
