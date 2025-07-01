class OpenaiQuestionGenerator
  require "openai"
  require "json"

  # Custom error class for OpenAI-related errors
  class OpenaiError < StandardError; end

  def initialize(query)
    @query = query.presence || "Generate a quiz question about a given topic with certain difficulty."
    @client = OpenAI::Client.new(
      access_token: ENV["OPENAI_API_KEY"],
      log_errors: true
    )
  end

  def clean_response_content(raw_content)
    # Remove ```json or ``` and trailing ```
    cleaned = raw_content.strip
      .gsub(/\A```json\s*/, '') # Remove starting ```json
      .gsub(/\A```\s*/, '')     # Remove starting ```
      .gsub(/```\z/, '')        # Remove ending ```
    cleaned
  end

  def call
    prompt = <<~PROMPT
      You are a helpful assistant that generates quiz questions based on tutor input.

      Please respond ONLY with JSON containing:
      - topic: a concise label (e.g., Math, Active Record, OOP)
      - difficulty: one of ["easy", "medium", "hard"]
      - question_text: a direct quiz question, NOT an instruction or meta-commentary.

      Example response:

      {
        "topic": "Math",
        "difficulty": "easy",
        "question_text": "What is 2 + 2?"
      }

      Tutor input: #{@query}
    PROMPT

    response = @client.chat(
      parameters: {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates quiz questions based on tutor input."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 100
      }
    )

    # Extract the JSON string from the response
    content = response.dig("choices", 0, "message", "content")

    raise OpenaiError, "Empty response from OpenAI" if content.blank?

    # Parse the JSON response safely
    cleaned_content = clean_response_content(content)
    question_data = JSON.parse(cleaned_content)
    question_data
  rescue JSON::ParserError => e
    raise OpenaiError, "Invalid JSON from OpenAI: #{e.message}"
  rescue OpenAI::Error => e
    raise OpenaiError, e.message
  end
end
