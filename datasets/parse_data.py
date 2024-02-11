import pandas as pd

excel_file_path = 'Conoco_Phillips.xlsx'

excel_data = pd.read_excel(excel_file_path, engine='openpyxl')  
df = pd.DataFrame(excel_data)

#json_str = excel_data.to_json()

#print('Excel Data:\n', json_str)

# output_path = 'conoco_output.json'

# for column_name in excel_data.columns:
#     column_data = excel_data[column_name]

#     json_str = column_data.to_json()

#     with open(output_path, 'w') as json_file:
#         json_file.write(json_str)

print(df)
df.to_json('output.json', orient='columns')