language=$1
solution_path=$2

echo "Running $solution_path"
case $language in
  "python") PYTHONPATH="." python "$solution_path/main.py";;
  "javascript") node "$solution_path/main.js";;
   *) echo "unknown language: $language" ;;
esac