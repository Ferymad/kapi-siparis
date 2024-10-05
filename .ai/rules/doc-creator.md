# Documentation Creator

This rule defines the process for creating documentation files for libraries or modules.

## Process

1. Identify the library or module to be documented.
2. Create a new Markdown file in the .ai/lib directory with the name of the library (e.g., sqlalchemy.md).
3. Structure the content as follows:
   - Title (H1): Library name
   - Introduction
   - Installation
   - Key Features
   - Usage
   - Configuration (if applicable)
   - Examples
   - Troubleshooting
   - Contributing (if open-source)
   - License

## Important: Content Output and Code Blocks

When creating documentation:

1. Output the entire content of the documentation as a single, uninterrupted code block.
2. Use six backticks (```````) to start and end the content block.
3. Specify the file path at the start of the content block: ```markdown:.ai/lib/[library_name].md
4. For each code block within the documentation:
   - Use HTML `<pre>` tags to wrap the code
   - Do not use backticks for code blocks
5. Do not include any other text or formatting outside of the main content block.

## File Creation and Content

The documentation file will be automatically created in the .ai/lib directory when the content is generated. There's no need for manual file creation or content insertion.

## Verification

After creating the documentation:
1. Confirm that the file has been created in the .ai/lib directory.
2. Open the file to verify its contents.
3. If the content is incomplete or missing, regenerate the documentation.