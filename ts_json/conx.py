file2_data = [
    {
      "value": "AD",
      "latitude": 42.546245,
      "longitude": 1.601554,
      "label": "Andorra",
    },
    {
      "value": "AE",
      "latitude": 23.424076,
      "longitude": 53.847818,
      "label": "United Arab Emirates",
    },
    # Add more entries as needed
]

def convert_data(input_data):
    output_data = []

    for item in input_data:
        output_data.append({
            "code": item["value"],
            "name": item["label"],
            "lat": item["latitude"],
            "lon": item["longitude"],
        })

    return output_data

file1_data = convert_data(file2_data)

print("export const file1Data = [")
for entry in file1_data:
    print("  {", end="")
    print(f'"code": "{entry["code"]}", "name": "{entry["name"]}",', end="")
    print(f'"lat": {entry["lat"]}, "lon": {entry["lon"]}', end="")
    print("},")
print("];")