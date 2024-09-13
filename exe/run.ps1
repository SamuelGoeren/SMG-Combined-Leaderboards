# Load JSON config
$configFile = "config.json"
$config = Get-Content -Raw -Path $configFile | ConvertFrom-Json

# Extract values
$character = $config.character
$category = $config.category
$filename = $config.filename

# Run executable with arguments
& ./main.exe --character $character --mode $mode --category $category --filename $filename
