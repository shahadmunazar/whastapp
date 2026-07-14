import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Shield, Phone, MapPin, Globe, Camera, Save, Lock, Edit2 } from 'lucide-react';

const BACKEND_URL = 'http://localhost:3000/api';

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    role: '',
    avatar: ''
  });

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/auth/profile`, authHeader);
        setFormData({
          name: res.data.name || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          bio: res.data.bio || '',
          location: res.data.location || '',
          website: res.data.website || '',
          role: res.data.role || 'User',
          avatar: res.data.avatar || ''
        });
        if (res.data.avatar) setProfileImage(res.data.avatar);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfileImage(base64);
        setFormData({ ...formData, avatar: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BACKEND_URL}/auth/profile`, formData, authHeader);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsEditing(false);
      alert('Profile updated successfully! ✨');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-0 animate__animated animate__fadeIn">
      {/* Header Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="bg-white p-4 rounded-4 shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4 border border-light">
            <div className="d-flex align-items-center gap-4">
              <div className="position-relative">
                <div className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center border border-white border-4 shadow-sm" style={{ width: '100px', height: '100px', fontSize: '2.5rem', overflow: 'hidden' }}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-100 h-100 object-fit-cover" />
                  ) : (
                    formData.name?.charAt(0).toUpperCase()
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0 p-2 border border-white border-2 shadow-sm"
                  title="Change Photo"
                >
                  <Camera size={14} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="d-none" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </div>
              <div>
                <h3 className="fw-bold mb-1">{formData.name}</h3>
                <div className="d-flex align-items-center gap-2 text-muted">
                  <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 fw-medium">
                    {formData.role}
                  </span>
                  <span className="d-flex align-items-center gap-1 small">
                    <MapPin size={14} /> {formData.location || 'Location not set'}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => {
                if (isEditing) handleSave({ preventDefault: () => {} } as any);
                else setIsEditing(true);
              }} 
              className={`btn ${isEditing ? 'btn-success' : 'btn-primary'} px-4 py-2 rounded-3 fw-bold d-flex align-items-center gap-2`}
            >
              {isEditing ? <><Save size={18} /> Save Changes</> : <><Edit2 size={18} /> Edit Profile</>}
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Stats & Social */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h6 className="fw-bold mb-4 text-uppercase small text-muted letter-spacing-1">Overview</h6>
            <div className="row g-3">
              <div className="col-6">
                <div className="bg-light p-3 rounded-4 text-center">
                  <div className="h4 fw-bold mb-0 text-primary">Active</div>
                  <div className="smaller text-muted">Status</div>
                </div>
              </div>
              <div className="col-6">
                <div className="bg-light p-3 rounded-4 text-center">
                  <div className="h4 fw-bold mb-0 text-success">Verified</div>
                  <div className="smaller text-muted">Account</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h6 className="fw-bold mb-4 text-uppercase small text-muted letter-spacing-1">Contact Details</h6>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-primary-subtle text-primary rounded-3 shadow-sm"><Mail size={18} /></div>
                <div>
                  <div className="smaller text-muted fw-medium">Email</div>
                  <div className="fw-bold small">{formData.email}</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-success-subtle text-success rounded-3 shadow-sm"><Phone size={18} /></div>
                <div>
                  <div className="smaller text-muted fw-medium">Phone</div>
                  <div className="fw-bold small">{formData.phone || 'Not provided'}</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <div className="p-2 bg-info-subtle text-info rounded-3 shadow-sm"><Globe size={18} /></div>
                <div>
                  <div className="smaller text-muted fw-medium">Website</div>
                  <div className="fw-bold small">{formData.website || 'Not provided'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h6 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <User size={18} className="text-primary"/> Personal Information
            </h6>
            <form onSubmit={handleSave}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Full Name</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-lg ${isEditing ? 'bg-white border' : 'bg-light border-0'}`} 
                    value={formData.name} 
                    readOnly={!isEditing}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg bg-light border-0" 
                    value={formData.email} 
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Phone Number</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-lg ${isEditing ? 'bg-white border' : 'bg-light border-0'}`} 
                    value={formData.phone} 
                    readOnly={!isEditing}
                    placeholder="+91 XXXXX XXXXX"
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Location</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-lg ${isEditing ? 'bg-white border' : 'bg-light border-0'}`} 
                    value={formData.location} 
                    readOnly={!isEditing}
                    placeholder="City, Country"
                    onChange={e => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Bio</label>
                  <textarea 
                    className={`form-control form-control-lg ${isEditing ? 'bg-white border' : 'bg-light border-0'}`} 
                    rows={3} 
                    value={formData.bio} 
                    readOnly={!isEditing}
                    placeholder="Tell us about yourself..."
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Website</label>
                  <input 
                    type="text" 
                    className={`form-control form-control-lg ${isEditing ? 'bg-white border' : 'bg-light border-0'}`} 
                    value={formData.website} 
                    readOnly={!isEditing}
                    placeholder="https://yourwebsite.com"
                    onChange={e => setFormData({...formData, website: e.target.value})}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h6 className="fw-bold mb-4 d-flex align-items-center gap-2 text-danger">
              <Shield size={18}/> Security & Privacy
            </h6>
            <div className="bg-light p-4 rounded-4 border border-dashed border-danger-subtle">
                <div className="d-flex align-items-center gap-3">
                    <div className="p-3 bg-danger-subtle text-danger rounded-circle shadow-sm"><Lock size={20}/></div>
                    <div>
                        <h6 className="fw-bold mb-1">Update Password</h6>
                        <p className="text-muted smaller mb-0">Ensure your account is using a long, random password to stay secure.</p>
                    </div>
                    <button className="btn btn-danger btn-sm ms-auto px-4 py-2 fw-bold rounded-3">Update</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
