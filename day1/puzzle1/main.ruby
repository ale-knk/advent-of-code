def total_distance(left_list, right_list)
  left_sorted = left_list.sort
  right_sorted = right_list.sort
  
  total_distance = left_sorted.zip(right_sorted).map { |a, b| (a - b).abs }.sum

  total_distance
end

def process_file(file_path)
  left_list = []
  right_list = []

  File.foreach(file_path) do |line|
    left, right = line.split.map(&:to_i) 
    left_list << left
    right_list << right
  end

  [left_list, right_list]
end

file_path = "input.txt"

left_list, right_list = process_file(file_path)
result = total_distance(left_list, right_list)

puts "The total distance is: #{result}"
