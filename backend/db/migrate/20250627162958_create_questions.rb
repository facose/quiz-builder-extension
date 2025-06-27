class CreateQuestions < ActiveRecord::Migration[8.0]
  def change
    create_table :questions do |t|
      t.string :topic, null: false
      t.string :difficulty, null: false
      t.text :question_text, null: false

      t.timestamps
    end

    add_index :questions, :topic
    add_index :questions, :created_at
  end
end
