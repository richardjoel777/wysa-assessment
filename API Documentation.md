
# API Documentation for Wysa for Sleep

This document outlines the API specifications for Wysa's Sleep Application onboarding process. This process involves conducting an assessment of the user's sleep schedule and provides a score ranging from 1 to 100, indicating the healthiness of the user's sleep patterns.

------------------------------------------------------------------------------------------

### Authentication (Admin)
**Auth required** : NO
<details>
 <summary><code>POST</code> <code><b>/auth/register</b></code> <code>(Create User with Unique username)</code></summary>

##### Parameters

> None

##### Body constraints
```json
{
	"username": "string",
	"password": "alpha numeric string with minimum 8 characters including at least 1 digit and 1 uppercase character"
}
```
##### Body Example
```json
{
	"username": "testuser",
	"password": "Password123"
}
```

##### Responses

 - ##### Success Response
   
   **Code** : `200`
   
   **Content example**
   ```json
   {
	   "message" : "User Created Successfully"
   }
   ```
 - ##### Error Response - Bad Request
	 
   **Code** : `400`
   
   **Content example**
   ```json
   {
	   "code" : "400",
	   "errors" : ["Username is required"]
	}
   ```
  - ##### Error Response - Username Taken
	 
	   **Code** : `409`
	   
	   **Content example**
	   ```json
	   {
		   "code" : "409",
		   "message" : "Username is Already Taken"
		}
	   ```
</details>
<details>
 <summary><code>POST</code> <code><b>/auth/login</b></code> <code>(Login With Username and Password)</code></summary>


##### Parameters

> None

##### Body constraints
```json
{
	"username": "String",
	"password": "alpha numeric string with minimum 8 characters including at least 1 digit and 1 uppercase character"
}
```
##### Body Example
```json
{
	"username": "testuser",
	"password": "Password123"
}
```

##### Responses

 - ##### Success Response
   
   **Code** : `200`
   
   **Content example**
   ```json
   {
	   "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   }
   ```
 - ##### Error Response - Bad Request
	 
   **Code** : `400`
   
   **Content example**
   ```json
   {
	   "code" : "400",
	   "errors" : ["Username is required"]
	}
   ```
  - ##### Error Response - Invalid Credentials
	 
	   **Code** : `401`
	   
	   **Content example**
	   ```json
	   {
		   "code" : "401",
		   "message" : "Invalid Username or Password"
		}
	   ```
</details>

------------------------------------------------------------------------------------------

### Assessment APIs (Admin)

**Auth required** : YES

##### Headers

> | key     | value                                       | description                                        |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `Authorization`      | `Bearer <JWT_TOKEN>` | Authentication Token                         |

#### Authentication Error Response

   **Code** : `401`
   
   **Content example**
   ```json
   {
	   "code": "401",
	   "message": "Unauthorized"
   }
   ```


<details>
 <summary><code>GET</code> <code><b>/admin/assessment/questions</b></code> <code>(gets all questions along with options)</code></summary>

##### Parameters

> None

##### Body

> None

##### Responses
 - ##### Success Response
   
   **Code** : `200`
   
   **Content example**
   ```json
   {
	   "questions" : [
	    {
		    "_id": "3b8e2275-5e03-4f09-9a9c-4736e21c20e0",
		    "title": "How many hours of sleep did you get last night?",
		    "answerType": "RANGE",
		    "active": true,
		    "multiSelect": false,
		    "range": {
			      "min": 1,
			      "max": 12,
			      "unit": "hr"
			 }
	    },
	    {
		    "_id": "6a2e635b-c3cd-4b2e-85bb-7ef77e4b0b92",
		    "title": "Did you experience any difficulty falling asleep?",
		    "answerType": "TEXT",
		    "options": ["Yes", "No"],
		    "active": true,
		    "multiSelect": false
	     },
		 {
		    "_id": "f1eae8c8-ee12-45a5-aa91-4a61a79654a9",
		    "title": "What time did you go to bed last night?",
		    "answerType": "TIME",
		    "active": true,
		    "multiSelect": false
		  }
		]
   }
   ```
  </details>
<details>
 <summary><code>GET</code> <code><b>/admin/assessment/questions/{id}</b></code> <code>(gets question by id)</code></summary>

##### Parameters
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | uuid  | Question ID  |


##### Body

> None

##### Responses
 - ##### Success Response
   
   **Code** : `200`
   
   **Content example**
   ```json
   {
	   "question": {
		    "_id": "3b8e2275-5e03-4f09-9a9c-4736e21c20e0",
		    "title": "How many hours of sleep did you get last night?",
		    "answerType": "RANGE",
		    "active": true,
		    "multiSelect": false,
		    "range": {
			      "min": 1,
			      "max": 12,
			      "unit": "hr"
			 }
	    }
   }
   ```
  - ##### Error Response - Not Found
   
	   **Code** : `404`
	   
	   **Content example**
	   ```json
	   {
		   "code": "404",
		   "message": "Question with given ID not found"
	   }
	   ```
</details>
<details>
 <summary><code>POST</code> <code><b>/admin/assessment/questions/</b></code> <code>(Create a Question)</code></summary>

##### Parameters

> None

##### Body constraints
```json
{
   {
	  "title": {
	    "type": "String",
	    "required": true
	  },
	  "answerType": {
	    "type": "String",
	    "required": true,
	    "enum": ["TEXT", "TIME", "RANGE"]
	  },
	  "options": [
	    {
	      "type": "String",
	      "required": true
	    }
	  ],
	  "active": {
	    "type": "Boolean",
	    "required": false
	  },
	  "multiSelect": {
	    "type": "Boolean",
	    "required": false
	  },
	  "range": {
	    "min": {
	      "type": "Number",
	      "required": true
	    },
	    "max": {
	      "type": "Number",
	      "required": true
	    },
	    "unit": {
	      "type": "String",
	      "required": true
	    }
	  }
   }
}
```
##### Body Example
```json
{
    "title": "How many hours of sleep did you get last night?",
    "answerType": "RANGE",
    "multiSelect": false,
    "range": {
	      "min": 1,
	      "max": 12,
	      "unit": "hr"
	 }
}
```
##### Responses
 - ##### Success Response
   
   **Code** : `200`
   
   **Content example**
   ```json
   {
	   "question": {
		    "_id": "3b8e2275-5e03-4f09-9a9c-4736e21c20e0",
		    "title": "How many hours of sleep did you get last night?",
		    "answerType": "RANGE",
		    "active": true,
		    "multiSelect": false,
		    "range": {
			      "min": 1,
			      "max": 12,
			      "unit": "hr"
			 }
	    },
	    "message": "Question Created Successfully"
   }
   ```
  - ##### Error Response - Bad Request
	 
	   **Code** : `400`
	   
	   **Content example**
	   ```json
	   {
		   "code" : "400",
		   "errors" : ["Title is required"]
		}
	   ```
</details>
<details>
 <summary><code>PATCH</code> <code><b>/admin/assessment/questions/{id}</b></code> <code>(Update a Question)</code></summary>

##### Parameters
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | uuid  | Question ID  |


##### Body constraints
```json
{
   {
	  "title": {
	    "type": "String"
	  },
	  "answerType": {
	    "type": "String",
	    "enum": ["TEXT", "TIME", "RANGE"]
	  },
	  "options": [
	    {
	      "type": "String"
	    }
	  ],
	  "active": {
	    "type": "Boolean"
	  },
	  "multiSelect": {
	    "type": "Boolean"
	  },
	  "range": {
	    "min": {
	      "type": "Number"
	    },
	    "max": {
	      "type": "Number"
	    },
	    "unit": {
	      "type": "String"
	    }
	  }
   }
}
```
##### Body Example
```json
{
    "title": "How many hours of sleep did you get last night?"
}
```
##### Responses
 - ##### Success Response
   
   **Code** : `200`
   
   **Content example**
   ```json
   {
	   "question": {
		    "_id": "3b8e2275-5e03-4f09-9a9c-4736e21c20e0",
		    "title": "How many hours of sleep did you get last night?",
		    "answerType": "RANGE",
		    "active": true,
		    "multiSelect": false,
		    "range": {
			      "min": 1,
			      "max": 12,
			      "unit": "hr"
			 }
	    },
	    "message": "Question Updated Successfully"
   }
   ```
  - ##### Error Response - Bad Request
	 
	   **Code** : `400`
	   
	   **Content example**
	   ```json
	   {
		   "code" : "400",
		   "errors" : ["Title can't be empty"]
		}
	   ```
- ##### Error Response - Not Found
   
   **Code** : `404`
   
   **Content example**
   ```json
   {
	   "code": "404",
	   "message": "Question with given ID not found"
   }
   ```
   </details>
   ------------------------------------------------------------------------------------
 ### Assessment APIs (Anonymous User)
 **Auth required** : NO
 <details>
 <summary><code>GET</code> <code><b>/assessment/questions</b></code> <code>(gets all active questions along with options)</code></summary>

##### Parameters

> None

##### Body

> None

##### Responses
 - ##### Success Response
   
   **Code** : `200`
   
   **Content example**
   ```json
   {
	   "questions" : [
	    {
		    "_id": "3b8e2275-5e03-4f09-9a9c-4736e21c20e0",
		    "title": "How many hours of sleep did you get last night?",
		    "answerType": "RANGE",
		    "multiSelect": false,
		    "range": {
			      "min": 1,
			      "max": 12,
			      "unit": "hr"
			 }
	    },
	    {
		    "_id": "6a2e635b-c3cd-4b2e-85bb-7ef77e4b0b92",
		    "title": "Did you experience any difficulty falling asleep?",
		    "answerType": "TEXT",
		    "options": ["Yes", "No"],
		    "multiSelect": false
	     },
		 {
		    "_id": "f1eae8c8-ee12-45a5-aa91-4a61a79654a9",
		    "title": "What time did you go to bed last night?",
		    "answerType": "TIME",
		    "multiSelect": false
		  }
		]
   }
   ```
 </details>
 <details>
  <summary><code>POST</code> <code><b>/assessment/</b></code> <code>(Submit answers and generate score)</code></summary>

  ##### Parameters

> None

##### Body constraints
```json
{
	"nickName": {
		"type": "String",
		"required": true
	},
	"submission": [
		{
			"questionId": {
				"type": "uuid",
				"required": true
			},
			"answers": [
				{
					"type": "String",
					"required": true
				}
			]
		}
	]
}
```
##### Body Example
```json
{
    "nickName": "John",
    "submission": [
	    {
		    "questionId": "3b8e2275-5e03-4f09-9a9c-4736e21c20e0",
		    "answers":  ["7.5"]
	    },
	    {
		    "questionId": "6a2e635b-c3cd-4b2e-85bb-7ef77e4b0b92", 
		    "answers": ["Yes"]
	    },
	    {
		    "questionId": "f1eae8c8-ee12-45a5-aa91-4a61a79654a9",
		    "answers":  ["10 PM"]
	    }
    ]
}
```
##### Responses
 - ##### Success Response
   
   **Code** : `200`
   
   **Content example**
   ```json
   {
	   "score": 80,
	   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
   }
   ```
  - ##### Error Response - Bad Request
 
	   **Code** : `400`
	   
	   **Content example**
	   ```json
	   {
		   "code" : "400",
		   "errors" : ["answers can't be empty"]
		}
	   ```
  - ##### Error Response - Not Found
 
	   **Code** : `404`
	   
	   **Content example**
	   ```json
	   {
		   "code" : "404",
		   "message" : "Invalid Question ID"
		}
	   ```
 </details>

---

![Sequence Diagram](https://i.ibb.co/6mWHNB9/diagram.png)

---

### Database Schema (MongoDB)

**Question**
```json
{
  "_id": {  
	  "type":  "ObjectId",  
	  "required":  true  
  },
  "title": {
    "required": true
  },
  "answerType": {
    "required": true,
    "enum": [
      "TEXT",
      "TIME",
      "RANGE"
    ]
  },
  "options": [
    {
      "required": true
    }
  ],
  "active": {
    "default": true
  },
  "multiSelect": {
    "default": false
  },
  "range": {
    "min": {
      "required": true
    },
    "max": {
      "required": true
    },
    "unit": {
      "required": true
    }
  }
}
```

**Answer**
```json
{
  "_id": {  
	  "type":  "ObjectId",  
	  "required":  true  
  },
  "nickName": {
    "required": true
  },
  "submission": [
    {
      "questionId": {
        "ref": "Question",
        "required": true
      },
      "answers": [
        {
          "required": true
        }
      ]
    }
  ]
}
```
**User**
```json
{
  "_id": {  
	  "type":  "ObjectId",  
	  "required":  true  
  },
  "username": {
    "required": true,
    "unique": true
  },
  "password": {
    "required": true
  }
}
```
