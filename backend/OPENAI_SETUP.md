# OpenAI API Setup for LLM Functionality

## Overview
The request wizard includes AI-powered medication recommendation functionality that requires an OpenAI API key.

## Setup Instructions

### 1. Get an OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the generated API key

### 2. Configure the API Key
Create a `.env` file in the `backend` directory with the following content:

```env
# Database Configuration
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=pharma_port_db
DB_PASSWORD=your_db_password
DB_PORT=5433

# OpenAI API Configuration
OPENAI_API_KEY=your_actual_openai_api_key_here

# Server Configuration
PORT=5002
NODE_ENV=development
```

### 3. Test the Configuration
1. Restart the backend server
2. Try using the LLM conversation feature in the request wizard
3. You should see AI responses instead of the fallback message

## Fallback Behavior
If the OpenAI API key is not configured:
- Users will see a message directing them to use the medication search feature
- The system will continue to work normally for direct medication selection
- No errors will be thrown

## Security Notes
- Never commit the `.env` file to version control
- The `.env` file is already in `.gitignore`
- Keep your API key secure and don't share it publicly

## Cost Considerations
- OpenAI API usage incurs costs based on the number of tokens used
- Monitor your usage in the OpenAI dashboard
- Consider setting up usage limits to control costs 