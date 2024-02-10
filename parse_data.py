
import  jpype     
import  asposecells 

jpype.startJVM() 
from asposecells.api import Workbook
workbook = Workbook("detailed-metrics-chart-by-country-6-15-23-2.xlsx")
workbook.save("detailed-metrics-chart-by-country-6-15-23-2.json")
jpype.shutdownJVM()
	
