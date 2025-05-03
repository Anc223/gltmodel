import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/models')
      .then(res => setFiles(res.data))
      .catch(err => console.error(err));
  }, []);

  const uploadFile = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Upload GLB Model</h1>
      <input type="file" accept=".glb" onChange={e => setSelectedFile(e.target.files[0])} />
      <button className="ml-2 px-4 py-2 bg-blue-500 text-white" onClick={uploadFile}>Upload</button>

      <h2 className="text-lg font-semibold mt-6">Available Models</h2>
      <ul className="mt-2">
        {files.map(file => (
          <li key={file._id}>
            <button
              className="text-blue-600 underline"
              onClick={() => navigate(`/viewer/${file._id}`)}
            >
              {file.filename}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
