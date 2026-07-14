import { useState, useEffect } from 'react';
import axios from 'axios';
import { Code, Clipboard, ShieldCheck, Link2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:3000/api';

const DeveloperApi = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);
  const [integrationLang, setIntegrationLang] = useState<'curl' | 'php' | 'laravel' | 'python' | 'js' | 'node' | 'java'>('curl');

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/projects`, authHeader);
        setProjects(res.data);
        if (res.data.length > 0) {
          setActiveProjectId(res.data[0].id);
        }
      } catch (err) {
        console.error('Fetch projects failed', err);
      }
    };
    fetchProjects();
  }, []);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const apiSnippets = {
    curl: `curl -X POST "http://localhost:3000/api/projects/${activeProjectId || '{PROJECT_ID}'}/send" \\
-H "Content-Type: application/json" \\
-H "X-Project-Token: ${activeProject?.apiToken || '{YOUR_API_TOKEN}'}" \\
-d '{
  "number": "RECIPIENT_NUMBER",
  "message": "Hello from cURL",
  "appId": "${activeProject?.appId || '{YOUR_APP_ID}'}",
  "apiToken": "${activeProject?.apiToken || '{YOUR_API_TOKEN}'}"
}'`,
    node: `const axios = require('axios');

const sendMessage = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/projects/${activeProjectId || '{PROJECT_ID}'}/send', {
      number: 'RECIPIENT_NUMBER',
      message: 'Hello from Node.js',
      appId: '${activeProject?.appId || '{YOUR_APP_ID}'}',
      apiToken: '${activeProject?.apiToken || '{YOUR_API_TOKEN}'}'
    }, {
      headers: { 'X-Project-Token': '${activeProject?.apiToken || '{YOUR_API_TOKEN}'}' }
    });
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};`,
    python: `import requests
import json

url = "http://localhost:3000/api/projects/${activeProjectId || '{PROJECT_ID}'}/send"
headers = {
    "Content-Type": "application/json",
    "X-Project-Token": "${activeProject?.apiToken || '{YOUR_API_TOKEN}'}"
}
payload = {
    "number": "RECIPIENT_NUMBER",
    "message": "Hello from Python",
    "appId": "${activeProject?.appId || '{YOUR_APP_ID}'}",
    "apiToken": "${activeProject?.apiToken || '{YOUR_API_TOKEN}'}"
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(response.json())`,
    java: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WhatsAppSender {
    public static void main(String[] args) throws Exception {
        String json = "{\\"number\\":\\"RECIPIENT_NUMBER\\",\\"message\\":\\"Hello from Java\\",\\"appId\\":\\"${activeProject?.appId || '{YOUR_APP_ID}'}\\",\\"apiToken\\":\\"${activeProject?.apiToken || '{YOUR_API_TOKEN}'}\\"}";
        
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("http://localhost:3000/api/projects/${activeProjectId || '{PROJECT_ID}'}/send"))
            .header("Content-Type", "application/json")
            .header("X-Project-Token", "${activeProject?.apiToken || '{YOUR_API_TOKEN}'}")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`,
    laravel: `use Illuminate\\Support\\Facades\\Http;

$response = Http::withHeaders([
    'X-Project-Token' => '${activeProject?.apiToken || '{YOUR_API_TOKEN}'}',
])->post('http://localhost:3000/api/projects/${activeProjectId || '{PROJECT_ID}'}/send', [
    'number' => 'RECIPIENT_NUMBER',
    'message' => 'Hello from Laravel',
    'appId' => '${activeProject?.appId || '{YOUR_APP_ID}'}',
    'apiToken' => '${activeProject?.apiToken || '{YOUR_API_TOKEN}'}'
]);

return $response->json();`,
    php: `<?php
$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => "http://localhost:3000/api/projects/${activeProjectId || '{PROJECT_ID}'}/send",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode([
    'number' => 'RECIPIENT_NUMBER',
    'message' => 'Hello from PHP',
    'appId' => '${activeProject?.appId || '{YOUR_APP_ID}'}',
    'apiToken' => '${activeProject?.apiToken || '{YOUR_API_TOKEN}'}'
  ]),
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "X-Project-Token: ${activeProject?.apiToken || '{YOUR_API_TOKEN}'}"
  ],
]);
$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);
if ($err) echo "cURL Error #:" . $err;
else echo $response;
?>`,
    js: `fetch("http://localhost:3000/api/projects/${activeProjectId || '{PROJECT_ID}'}/send", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Project-Token': '${activeProject?.apiToken || '{YOUR_API_TOKEN}'}'
  },
  body: JSON.stringify({
    number: 'RECIPIENT_NUMBER',
    message: 'Hello from JS',
    appId: '${activeProject?.appId || '{YOUR_APP_ID}'}',
    apiToken: '${activeProject?.apiToken || '{YOUR_API_TOKEN}'}'
  })
})
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));`
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item"><Link to="/integrations">Integrations</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Developer API</li>
            </ol>
          </nav>
          <h2 className="fw-bold mb-0">Developer API</h2>
          <p className="text-muted">Integrate WhatsApp sending capabilities into your own applications.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2"><Link2 size={18} /> Select Project</h6>
              <p className="small text-muted mb-3">Select the WhatsApp project you want to authenticate with.</p>
              <select 
                className="form-select form-select-lg mb-0" 
                value={activeProjectId || ''} 
                onChange={(e) => setActiveProjectId(Number(e.target.value))}
              >
                <option value="" disabled>Select a project...</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.number})</option>
                ))}
              </select>
              {projects.length === 0 && (
                <div className="alert alert-warning small mt-3 mb-0">
                  You don't have any projects yet. <Link to="/whatsapp" className="alert-link">Create one here</Link>.
                </div>
              )}
            </div>
          </div>

          <div className="card border-0 shadow-sm border-top border-primary border-4">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2"><ShieldCheck size={18} /> API Credentials</h6>
              <p className="small text-muted mb-4">These credentials are required to authenticate your API requests. Keep your API Token secret.</p>
              
              <div className="mb-3">
                <label className="small fw-bold text-muted mb-1">App ID</label>
                <div className="input-group">
                  <input type="text" className="form-control bg-light" value={activeProject?.appId || ''} readOnly />
                  <button className="btn btn-outline-secondary bg-light" onClick={() => copyToClipboard(activeProject?.appId)}>
                    <Clipboard size={16} />
                  </button>
                </div>
              </div>
              
              <div className="mb-0">
                <label className="small fw-bold text-muted mb-1">API Token</label>
                <div className="input-group">
                  <input type="password" className="form-control bg-light" value={activeProject?.apiToken || ''} readOnly />
                  <button className="btn btn-outline-secondary bg-light" onClick={() => copyToClipboard(activeProject?.apiToken)}>
                    <Clipboard size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 p-lg-5">
              <h4 className="fw-bold mb-4 d-flex align-items-center gap-2"><Code size={24} className="text-primary" /> Send Message Endpoint</h4>
              <p className="text-muted mb-4">
                Send a WhatsApp message programmatically by making an HTTP POST request to our API endpoint.
                Make sure to include your <code>X-Project-Token</code> header.
              </p>
              
              <div className="mb-4">
                <h6 className="fw-bold">Endpoint</h6>
                <div className="bg-light p-3 rounded border font-monospace">
                  <span className="badge bg-success me-2">POST</span> 
                  {BACKEND_URL}/projects/{activeProjectId || '{PROJECT_ID}'}/send
                </div>
              </div>

              <h6 className="fw-bold mb-3">Code Snippets</h6>
              <div className="mb-3 d-flex flex-wrap gap-2">
                {['curl', 'php', 'laravel', 'python', 'js', 'node', 'java'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setIntegrationLang(lang as any)}
                    className={`btn btn-sm rounded-pill px-3 py-1 ${integrationLang === lang ? 'btn-primary' : 'btn-outline-secondary'}`}
                    style={{ textTransform: 'capitalize', fontWeight: 500 }}
                  >
                    {lang === 'js' ? 'JavaScript' : lang === 'node' ? 'Node.js' : lang}
                  </button>
                ))}
              </div>
              <div className="position-relative">
                <button 
                  onClick={() => copyToClipboard(apiSnippets[integrationLang as keyof typeof apiSnippets])} 
                  className="btn btn-sm btn-dark position-absolute top-0 end-0 m-2 border-0 shadow-sm"
                >
                  <Clipboard size={14} /> Copy
                </button>
                <pre className="bg-dark text-white p-4 rounded small overflow-auto shadow-sm" style={{ maxHeight: '400px' }}>
                  <code>{apiSnippets[integrationLang as keyof typeof apiSnippets]}</code>
                </pre>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperApi;
