def has_table(db, table_name)
  tbl_names = db.execute("SELECT tbl_name FROM sqlite_master WHERE type == 'table'")
  tbl_names.each do |tbl_name|
    if tbl_name.has_value?(table_name)
      return true
    else
      return false
    end
  end
  false
end
