#!/bin/bash

equipment_file="/Users/ris/Desktop/uuu/data/equipment_data.js"

# 检查文件是否存在
if [ ! -f "$equipment_file" ]; then
    echo "Equipment data file not found!"
    exit 1
fi

# 创建临时文件
temp_file=$(mktemp)

# 状态标志，用于追踪是否在处理对象内部
in_object=0
in_array=0
current_object=""

while IFS= read -r line; do
    # 检测数组开始
    if [[ $line =~ ^const.*=.*\[ ]]; then
        in_array=1
        echo "$line" >> "$temp_file"
        continue
    fi

    # 检测数组结束
    if [[ $line =~ ^\] ]]; then
        in_array=0
        echo "$line" >> "$temp_file"
        continue
    fi

    # 检测对象开始
    if [[ $line =~ ^[[:space:]]*\{ ]]; then
        in_object=1
        current_object="$line"
        continue
    fi

    # 如果在对象内部
    if [ $in_object -eq 1 ]; then
        current_object+=$'\n'"$line"
        
        # 检测对象结束
        if [[ $line =~ ^[[:space:]]*\}, ]]; then
            # 提取名称
            if [[ $current_object =~ \"名称\":\ *\"([^\"]+)\" ]]; then
                name="${BASH_REMATCH[1]}"
                # 提取英文部分
                id=$(echo "$name" | grep -o '[A-Za-z &]*$' | sed 's/ /_/g' | sed 's/^_*//' | sed 's/_*$//')
                
                if [ ! -z "$id" ]; then
                    # 构建新的对象字符串
                    echo "{" >> "$temp_file"
                    echo "        \"ID\": \"$id\"," >> "$temp_file"
                    echo "$current_object" | sed '1d' >> "$temp_file"
                else
                    echo "$current_object" >> "$temp_file"
                fi
            else
                echo "$current_object" >> "$temp_file"
            fi
            
            in_object=0
            current_object=""
        fi
    else
        # 不在对象内则直接写入行
        echo "$line" >> "$temp_file"
    fi
done < "$equipment_file"

# 将处理后的内容移回原文件
mv "$temp_file" "$equipment_file"

echo "Processing completed!"
