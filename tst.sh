#!/bin/bash

# Greet the user with a personalized message
echo "Hello there! Welcome to the Customized Shell Script."

# Create a backup directory with timestamp
backup_dir="backup_$(date +'%Y%m%d_%H%M%S')"
mkdir "$backup_dir"
echo "Created backup directory: $backup_dir"

# Backup important configuration files
config_files=("nginx.conf" "mysql.conf" "apache.conf")
for file in "${config_files[@]}"; do
    cp "/etc/$file" "$backup_dir/$file.backup"
    echo "Backed up /etc/$file to $backup_dir/$file.backup"
done

# Check available disk space
disk_space=$(df -h / | awk 'NR==2 {print $4}')
echo "Available disk space on root: $disk_space"

# Generate a list of installed packages
package_list="installed_packages.txt"
dpkg --get-selections > "$package_list"
echo "List of installed packages saved in $package_list"

# Scan for open ports on localhost
open_ports=$(nmap -p- localhost | grep "open" | awk -F'/' '{print $1}' | tr '\n' ', ')
echo "Open ports on localhost: $open_ports"

# Monitor CPU and memory usage
top -n 1 -b > system_usage.txt
echo "CPU and memory usage information saved in system_usage.txt"

# Send an email with the backup and system usage info
mail_subject="Backup and System Usage Report"
mail_body="Hello,\n\nWe have performed a backup and system usage monitoring. Attached are the backup files and system_usage.txt.\n\nBest regards,\nYour Custom Script"
echo -e "$mail_body" | mailx -s "$mail_subject" -A "$backup_dir" -A "system_usage.txt" your@email.com
echo "Sent email notification with backup and system usage info."

# Display a farewell message
echo "Thank you for using the Customized Shell Script. Have a great day!"
