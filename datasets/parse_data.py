import xlrd
from collections import OrderedDict
import json

conoco_wb = xlrd.open_workbook("detailed-metrics-chart-by-country-6-15-23-2.xlsx")
sh = conoco_wb.sheet_by_index(0)

data_list = []
for rownum in range(1,sh.nrows):
    data = OrderedDict()

row_values = sh.row_values(rownum)
data['']