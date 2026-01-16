Sequel.migration do
  change do
    create_table(:items) do
      primary_key :id
      String :name, null: false
      Integer :quantity, default: 0
      DateTime :created_at
    end
  end
end
