---
---

### `GET`

🔹 **Has only headers**  
Retrieve a specific resource or collection of resources.  
Should **not** affect data or resources.  
✅ **Can be cached**  
⚠️ **Avoid sending sensitive data**  
📏 **Has length restrictions** (can’t send large files)

### `POST`

🔹 **Has headers and body**  
Creates a new resource.  
Each POST request should create a new resource with a unique ID.  
🚫 **Never cached.**

### `PUT`

🔹 **Has headers and body**  
Updates a specific resource (by ID).  
Replaces all current representations of the target resource with the uploaded content.

### `PATCH`

🔹 **Has headers and body**  
Updates **partial** resources.

### `DELETE`

🔹 **Has headers and body**  
Removes a specific resource by ID.  
Removes all current representations of the target resource given by a URI.

## Other HTTP Methods

### `HEAD`

🔹 **Has only headers**  
Same as GET but does not return a body — only headers and status line.  
Used for obtaining meta-information about the entity.

### `OPTIONS`

🔹 **Has headers and body**  
Used to check supported HTTP methods (communication options) for the target resource.

### `CONNECT`

Establishes a tunnel to the server identified by a given URI.

### `TRACE`

Echoes the received request so a client can see what (if any) changes or additions have been made by intermediate servers.

⚠️ **Security note:** TRACE can enable malicious parties to steal cookies or credentials via XSS.  
Disable TRACE requests in server configuration.

## HTTP Status Codes

|Code|Meaning|
|----|-------|
|**100**|Continue|
|**200**|OK|
|**201**|Created|
|**202**|Accepted|
|**204**|No Content|
|**302**|Found (URL redirection or use **303**)|
|**400**|Bad Request|
|**401**|Unauthorized|
|**402**|Payment Required|
|**403**|Forbidden|
|**404**|Not Found|
|**408**|Request Timeout|
|**500**|Internal Server Error|
|**503**|Service Unavailable|

---

## HTTP Status Code Categories

|Category|Description|
|--------|-----------|
|**1xx**|Informational|
|**2xx**|Success|
|**3xx**|Redirection|
|**4xx**|Client Error|
|**5xx**|Server Error|

 > 
 > 🫖 **418 — [I'm a teapot (1998 April Fools’ joke)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418)**

## 📨 Fields in HTTP Request Headers

### Example of HTTP Message Headers

````http
GET /hello.html HTTP/1.1
User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
Host: www.tutorialspoint.com
Accept-Encoding: gzip, deflate
Connection: Keep-Alive
````

### Meaning

* **Line 1:** Method, URI, and HTTP version (`GET /hello.html HTTP/1.1`)
* **Line 2:** `User-Agent` — Client browser info, where the request originates from
* **Line 3:** `Host` — Specifies the Internet host and port number of the resource
* **Line 4:** `Accept-Encoding` — Restricts acceptable content-codings in the response
* **Line 5:** `Connection` —  
  Using `"keep-alive"` keeps the TCP connection open for subsequent requests,  
  improving performance and reducing CPU load via **persistent connections**

---
