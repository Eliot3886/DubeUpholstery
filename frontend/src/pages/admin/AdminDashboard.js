import React, { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, Users, FileText, Image as ImageIcon,
  Settings, LogOut, Bell, Search, Menu, X, Trash2, Pencil
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Admin.css';


const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Double-verify authentication on mount (Anti-Bypass Protection)
  useEffect(() => {
    if (sessionStorage.getItem('isAdminAuthenticated') !== 'true') {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data States
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [services, setServices] = useState([]);
  const [fabrics, setFabrics] = useState([]);
  const [formError, setFormError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // { type: 'gallery'|'service', item: obj }
  const fileInputRef = React.useRef(null);

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${d} ${hh}:${mm}`;
  };

  const fetchData = async () => {
    try {
      const [quotesRes, contactsRes, galleryRes, servicesRes, profileRes, fabricsRes] = await Promise.all([
        fetch('https://dubeupholstery-1.onrender.com/api/quotes/'),
        fetch('https://dubeupholstery-1.onrender.com/api/contacts/'),
        fetch('https://dubeupholstery-1.onrender.com/api/gallery/'),
        fetch('https://dubeupholstery-1.onrender.com/api/services/'),
        fetch('https://dubeupholstery-1.onrender.com/api/profiles/'),
        fetch('https://dubeupholstery-1.onrender.com/api/fabrics/')
      ]);
      if (quotesRes.ok) setQuotes(await quotesRes.json());
      if (contactsRes.ok) setContacts(await contactsRes.json());
      if (galleryRes.ok) setGallery(await galleryRes.json());
      if (servicesRes.ok) setServices(await servicesRes.json());
      if (profileRes.ok) {
        const profiles = await profileRes.json();
        if (profiles.length > 0) setAdminProfile(profiles[0]);
      }
      if (fabricsRes.ok) setFabrics(await fabricsRes.json());
    } catch (e) {
      console.error("Failed to fetch data", e);
    }
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profile_picture', file);
    formData.append('user', 1); // Mock user ID or proper auth if added
    try {
      const url = adminProfile ? `https://dubeupholstery-1.onrender.com/api/profiles/${adminProfile.id}/` : 'https://dubeupholstery-1.onrender.com/api/profiles/';
      const method = adminProfile ? 'PATCH' : 'POST';
      const response = await fetch(url, {
        method: method,
        body: formData
      });
      if (response.ok) {
        setAdminProfile(await response.json());
      }
    } catch (error) {
      console.error("Failed to upload profile picture", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000); // Polling every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const markQuotesAsRead = useCallback(async () => {
    const unread = quotes.filter(q => !q.is_read);
    if (unread.length === 0) return;

    try {
      await Promise.all(unread.map(q =>
        fetch(`https://dubeupholstery-1.onrender.com/api/quotes/${q.id}/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_read: true })
        })
      ));
      // Refresh data locally
      setQuotes(prevQuotes => prevQuotes.map(q => ({ ...q, is_read: true })));
    } catch (e) {
      console.error("Failed to mark quotes as read", e);
    }
  }, [quotes]);

  const markContactsAsRead = useCallback(async () => {
    const unread = contacts.filter(c => !c.is_read);
    if (unread.length === 0) return;

    try {
      await Promise.all(unread.map(c =>
        fetch(`https://dubeupholstery-1.onrender.com/api/contacts/${c.id}/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_read: true })
        })
      ));
      setContacts(prevContacts => prevContacts.map(c => ({ ...c, is_read: true })));
    } catch (e) {
      console.error("Failed to mark contacts as read", e);
    }
  }, [contacts]);

  useEffect(() => {
    if (activeTab === 'quotes') markQuotesAsRead();
    if (activeTab === 'customers') markContactsAsRead();
  }, [activeTab, markQuotesAsRead, markContactsAsRead]);


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const generateReport = (tab) => {
    let rawData = [];
    if (tab === 'quotes' || tab === 'dashboard') rawData = quotes;
    else if (tab === 'customers') rawData = contacts;
    else if (tab === 'gallery') rawData = gallery;
    else if (tab === 'services') rawData = services;

    if (!rawData || !rawData.length) {
      alert('No data to export');
      return;
    }

    const fields = Object.keys(rawData[0]).filter(k => k !== 'images');
    const csvRows = [];
    csvRows.push(fields.join(','));
    for (const row of rawData) {
      csvRows.push(fields.map(k => `"${(row[k] || '').toString().replace(/"/g, '""')}"`).join(','));
    }

    const blob = new Blob([csvRows.join('\\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dube_${tab}_report.csv`;
    a.click();
  };

  return (
    <div className="admin-layout animate-fade-in">
      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="admin-overlay" onClick={toggleSidebar} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)', zIndex: 99 }} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-logo-area">
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/admin" className="admin-brand d-flex flex-column align-items-center gap-2 text-center py-2">
              <img src="/logo.jpeg" alt="Logo" className="admin-sidebar-logo" />
              <div className="brand-text-wrapper">
                <span className="logo-text text-white d-block" style={{ fontSize: '1rem', letterSpacing: '1px' }}>Dube Upholstery</span>
              </div>
            </Link>
            <button className="admin-hamburger d-lg-none" onClick={toggleSidebar} style={{ background: 'transparent', border: 'none', color: 'white' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className={`admin-nav-item ${activeTab === 'quotes' ? 'active' : ''}`} onClick={() => setActiveTab('quotes')}>
            <FileText size={20} /> Quotes / Requests
            {quotes.filter(q => !q.is_read).length > 0 && <span className="badge badge-primary ml-auto pulse-badge">{quotes.filter(q => !q.is_read).length}</span>}
          </button>
          <button className={`admin-nav-item ${activeTab === 'customers' ? 'active' : ''}`} onClick={() => setActiveTab('customers')}>
            <Users size={20} /> Customers
            {contacts.filter(c => !c.is_read).length > 0 && <span className="badge badge-success ml-auto pulse-badge">{contacts.filter(c => !c.is_read).length}</span>}
          </button>
          <button className={`admin-nav-item ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
            <ImageIcon size={20} /> Manage Gallery
          </button>
          <button className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
            <Settings size={20} /> Manage Services
          </button>
          <button className={`admin-nav-item ${activeTab === 'fabrics' ? 'active' : ''}`} onClick={() => setActiveTab('fabrics')}>
            <ImageIcon size={20} /> Fabric Catalog
          </button>
          <button className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <Users size={20} /> Admin Profile
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-nav-item text-danger" onClick={handleLogout}>
            <LogOut size={20} /> Logout
          </button>
          <Link to="/" className="text-muted mt-2 d-block text-center" style={{ fontSize: '0.8rem' }}>View Live Site</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {/* Top Header */}
        <header className="admin-header">
          <div className="d-flex align-items-center">
            <button className="admin-hamburger" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <div className="admin-search d-none d-md-flex">
              <Search size={18} className="text-muted" />
              <input type="text" placeholder="Search requests, customers..." className="admin-input border-0" />
            </div>
          </div>

          <div className="admin-header-actions">
            <div className="admin-notifications mr-4" style={{ cursor: 'pointer', position: 'relative' }}>
              <Bell size={24} className="text-muted hover-primary" />
              {(quotes.filter(q => !q.is_read).length + contacts.filter(c => !c.is_read).length) > 0 && (
                <span className="badge badge-danger pulse-badge" style={{ position: 'absolute', top: -5, right: -10, background: '#e74c3c' }}>
                  {quotes.filter(q => !q.is_read).length + contacts.filter(c => !c.is_read).length}
                </span>
              )}
            </div>
              {adminProfile && adminProfile.profile_picture ? (
                <img src={adminProfile.profile_picture.startsWith('http') || adminProfile.profile_picture.startsWith('data:') ? adminProfile.profile_picture : `https://dubeupholstery-1.onrender.com${adminProfile.profile_picture}`} alt="Admin" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div className="admin-avatar">A</div>
              )}

              <span className="admin-name">{adminProfile?.user?.first_name || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content area */}
        <div className="admin-main-area">
          {/* Image Preview Modal */}
          {previewImage && (
            <div className="image-preview-modal" onClick={() => setPreviewImage(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
                <button style={{ position: 'absolute', top: -40, right: -40, background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setPreviewImage(null)}><X size={32} /></button>
                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }} onClick={(e) => e.stopPropagation()} />
              </div>
            </div>
          )}

          <div className="admin-page-header">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Overview</h2>
            <button className="btn btn-primary btn-sm" onClick={() => generateReport(activeTab)}>Generate Report</button>
          </div>

          {/* Conditionally Render Content based on activeTab */}
          {activeTab === 'dashboard' && (
            <div className="admin-stats-grid">
              <div className="admin-stat-card glass-admin" onClick={() => setActiveTab('quotes')} style={{ cursor: 'pointer' }}>
                <div className="stat-icon bg-primary-light">
                  <FileText size={24} className="text-primary" />
                </div>
                <div className="stat-info">
                  <h3>{quotes.length}</h3>
                  <p>Total Requests</p>
                  {quotes.filter(q => !q.is_read).length > 0 && (
                    <span className="badge badge-primary pulse-badge">{quotes.filter(q => !q.is_read).length} New</span>
                  )}
                </div>
              </div>

              <div className="admin-stat-card glass-admin" onClick={() => setActiveTab('customers')} style={{ cursor: 'pointer' }}>
                <div className="stat-icon bg-success-light">
                  <Users size={24} className="text-success" />
                </div>
                <div className="stat-info">
                  <h3>{contacts.length}</h3>
                  <p>Contact Messages</p>
                  {contacts.filter(c => !c.is_read).length > 0 && (
                    <span className="badge badge-success pulse-badge">{contacts.filter(c => !c.is_read).length} New</span>
                  )}
                </div>
              </div>

              <div className="admin-stat-card glass-admin">
                <div className="stat-icon bg-info-light">
                  <ImageIcon size={24} className="text-info" />
                </div>
                <div className="stat-info">
                  <h3>{gallery.length}</h3>
                  <p>Gallery Entries</p>
                  <button className="btn-link" onClick={() => setActiveTab('gallery')}>Manage</button>
                </div>
              </div>

              <div className="admin-stat-card glass-admin">
                <div className="stat-icon bg-warning-light">
                  <Settings size={24} className="text-warning" />
                </div>
                <div className="stat-info">
                  <h3>{services.length}</h3>
                  <p>Service Entries</p>
                  <button className="btn-link" onClick={() => setActiveTab('services')}>Manage</button>
                </div>
              </div>

              <div className="admin-stat-card glass-admin">
                <div className="stat-icon bg-success-light">
                  <ImageIcon size={24} className="text-success" />
                </div>
                <div className="stat-info">
                  <h3>{fabrics.length}</h3>
                  <p>Fabric Items</p>
                  <button className="btn-link" onClick={() => setActiveTab('fabrics')}>Manage</button>
                </div>
              </div>
            </div>
          )}

          {/* Quotes view or Dashboard View parts */}
          {(activeTab === 'dashboard' || activeTab === 'quotes') && (
            <div className="admin-section">
              <div className="admin-card glass-admin">
                <div className="card-header">
                  <h3>Quote Requests</h3>
                  {activeTab === 'dashboard' && <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('quotes')}>View All</button>}
                </div>

                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Service Needed</th>
                        <th>Phone</th>
                        <th>Photos</th>
                        <th>Received (Date & Time)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote, idx) => (
                        <tr key={quote.id || idx}>
                          <td data-label="ID" className="font-mono text-muted">{quote.id || `Q-${100 + idx}`}</td>
                          <td data-label="Customer Name" className="font-weight-600">{quote.name}</td>
                          <td data-label="Service Needed">{quote.service}</td>
                          <td data-label="Phone">{quote.phone}</td>
                          <td data-label="Photos">
                            <div className="d-flex align-items-center gap-2">
                              {quote.images && quote.images.length > 0 ? (
                                quote.images.map((imgObj, idx) => {
                                  const srcUrl = imgObj.image.startsWith('http') || imgObj.image.startsWith('data:') ? imgObj.image : `https://dubeupholstery-1.onrender.com${imgObj.image}`;
                                  return <img key={idx} src={srcUrl} alt="quote attach" style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: 4, cursor: 'pointer', display: 'inline-block' }} onClick={() => setPreviewImage(srcUrl)} />
                                })

                              ) : (
                                <span className="text-muted" style={{ fontSize: '0.8rem' }}>No photos</span>
                              )}
                            </div>
                          </td>
                          <td data-label="Received">{formatDateTime(quote.date)}</td>
                          <td data-label="Action">
                            <button className="icon-btn text-muted hover-primary" onClick={async () => {
                              try {
                                await fetch(`https://dubeupholstery-1.onrender.com/api/quotes/${quote.id}/`, { method: 'DELETE' });
                                setQuotes(quotes.filter(q => q.id !== quote.id));
                              } catch (e) {
                                console.error(e);
                              }
                            }}>
                              <Trash2 size={18} className="text-danger" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {quotes.length === 0 && (
                        <tr><td colSpan="7" className="text-center py-4">No requests found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="admin-section">
              <div className="admin-card glass-admin">
                <div className="card-header">
                  <h3>Contact Messages</h3>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Received</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact, idx) => (
                        <tr key={idx}>
                          <td data-label="Name" className="font-weight-600">{contact.name}</td>
                          <td data-label="Email">{contact.email}</td>
                          <td data-label="Phone">{contact.phone}</td>
                          <td data-label="Message" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {contact.message}
                          </td>
                          <td data-label="Received" className="text-muted">{formatDateTime(contact.date)}</td>
                          <td data-label="Action">
                            <button className="icon-btn text-danger hover-primary" onClick={async () => {
                              try {
                                await fetch(`https://dubeupholstery-1.onrender.com/api/contacts/${contact.id}/`, { method: 'DELETE' });
                                setContacts(contacts.filter(c => c.id !== contact.id));
                              } catch (e) {
                                console.error(e);
                              }
                            }}>
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {contacts.length === 0 && (
                        <tr><td colSpan="5" className="text-center py-4">No contact messages received.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="admin-section">
              <div className="admin-card glass-admin mb-4">
                <div className="card-header">
                  <h3>{editingItem?.type === 'gallery' ? 'Edit Gallery Image' : 'Add New Gallery Image'}</h3>
                  {editingItem?.type === 'gallery' && <button className="btn btn-outline btn-sm" onClick={() => {
                    setEditingItem(null);
                    document.getElementById('gal-title').value = '';
                    document.getElementById('gal-file').value = '';
                  }}>Cancel Edit</button>}
                </div>
                <div className="admin-form px-3 pb-3">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <input type="text" className="form-control" placeholder="Title" id="gal-title" defaultValue={editingItem?.type === 'gallery' ? editingItem.item.title : ''} />
                    </div>
                    <div className="col-md-4 mb-3">
                      <select className="form-control" id="gal-category" defaultValue={editingItem?.type === 'gallery' ? editingItem.item.category : 'Sofa & Chair Repair'}>
                        <option value="Sofa & Chair Repair">Sofa & Chair Repair</option>
                        <option value="Car Seat Repair">Car Seat Repair</option>
                        <option value="Headboards">Headboards</option>
                        <option value="Complete Reupholstery">Complete Reupholstery</option>
                        <option value="Car Trimming">Car Trimming</option>
                        <option value="Bed Repair">Bed Repair</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <input type="file" className="form-control" id="gal-file" accept="image/*" />
                      {editingItem?.type === 'gallery' && <small className="text-muted">Leave blank to keep current image</small>}
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={async () => {
                    const title = document.getElementById('gal-title').value;
                    const cat = document.getElementById('gal-category').value;
                    const fileInput = document.getElementById('gal-file');

                    if (title && (fileInput.files.length > 0 || editingItem)) {
                      try {
                        const formData = new FormData();
                        formData.append('title', title);
                        formData.append('category', cat);
                        if (fileInput.files[0]) formData.append('img', fileInput.files[0]);

                        const url = editingItem ? `https://dubeupholstery-1.onrender.com/api/gallery/${editingItem.item.id}/` : 'https://dubeupholstery-1.onrender.com/api/gallery/';
                        const method = editingItem ? 'PATCH' : 'POST';

                        const response = await fetch(url, {
                          method: method,
                          body: formData
                        });
                        if (response.ok) {
                          const result = await response.json();
                          if (editingItem) {
                            setGallery(gallery.map(g => g.id === result.id ? result : g));
                            setEditingItem(null);
                          } else {
                            setGallery([result, ...gallery]);
                          }
                          document.getElementById('gal-title').value = '';
                          fileInput.value = '';
                          setFormError('');
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    } else {
                      setFormError("Please fill title and select an image file.");
                    }
                  }}>
                    {editingItem?.type === 'gallery' ? 'Update Item' : 'Add to Gallery'}
                  </button>
                  {formError && activeTab === 'gallery' && <p className="text-danger mt-2">{formError}</p>}
                </div>
              </div>

              <div className="admin-card glass-admin">
                <div className="card-header">
                  <h3>Gallery Management</h3>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Image Preview</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Uploaded (Date & Time)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gallery.map((item, idx) => (
                        <tr key={idx}>
                          <td data-label="Preview">
                            {item.img ? (
                              <img
                                src={item.img.startsWith('http') || item.img.startsWith('data:') ? item.img : `https://dubeupholstery-1.onrender.com${item.img}`}
                                alt={item.title}
                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', display: 'inline-block' }}
                                onClick={() => setPreviewImage(item.img.startsWith('http') || item.img.startsWith('data:') ? item.img : `https://dubeupholstery-1.onrender.com${item.img}`)}
                              />
                            ) : (
                              <div style={{ width: '60px', height: '60px', background: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={20} className="text-muted" /></div>
                            )}
                          </td>

                          <td data-label="Title" className="font-weight-600">{item.title}</td>
                          <td data-label="Category">{item.category}</td>
                          <td data-label="Uploaded" className="text-muted">{formatDateTime(item.date)}</td>
                          <td data-label="Action">
                            <div className="d-flex gap-2 justify-content-end">
                              <button className="icon-btn text-primary" onClick={() => {
                                setEditingItem({ type: 'gallery', item: item });
                                window.scrollTo(0, 0);
                              }}>
                                <Pencil size={18} />
                              </button>
                              <button className="icon-btn text-danger" onClick={async () => {
                                try {
                                  await fetch(`https://dubeupholstery-1.onrender.com/api/gallery/${item.id}/`, { method: 'DELETE' });
                                  setGallery(gallery.filter(g => g.id !== item.id));
                                } catch (e) {
                                  console.error(e);
                                }
                              }}>
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {gallery.length === 0 && (
                        <tr><td colSpan="5" className="text-center py-4">No gallery items found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="admin-section">
              <div className="admin-card glass-admin mb-4">
                <div className="card-header">
                  <h3>{editingItem?.type === 'service' ? 'Edit Service' : 'Add New Service'}</h3>
                  {editingItem?.type === 'service' && <button className="btn btn-outline btn-sm" onClick={() => {
                    setEditingItem(null);
                    document.getElementById('srv-title').value = '';
                    document.getElementById('srv-desc').value = '';
                    document.getElementById('srv-file').value = '';
                  }}>Cancel Edit</button>}
                </div>
                <div className="admin-form px-3 pb-3">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input type="text" className="form-control" placeholder="Service Title" id="srv-title" defaultValue={editingItem?.type === 'service' ? editingItem.item.title : ''} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input type="file" className="form-control" id="srv-file" accept="image/*" />
                      {editingItem?.type === 'service' && <small className="text-muted">Leave blank to keep current image</small>}
                    </div>
                    <div className="col-md-12 mb-3">
                      <textarea className="form-control" rows="3" placeholder="Service Description" id="srv-desc" defaultValue={editingItem?.type === 'service' ? editingItem.item.desc : ''}></textarea>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={async () => {
                    const title = document.getElementById('srv-title').value;
                    const fileInput = document.getElementById('srv-file');
                    const desc = document.getElementById('srv-desc').value;

                    if (title && (fileInput.files.length > 0 || editingItem) && desc) {
                      try {
                        const formData = new FormData();
                        formData.append('title', title);
                        formData.append('desc', desc);
                        if (fileInput.files[0]) formData.append('img', fileInput.files[0]);

                        const url = editingItem ? `https://dubeupholstery-1.onrender.com/api/services/${editingItem.item.id}/` : 'https://dubeupholstery-1.onrender.com/api/services/';
                        const method = editingItem ? 'PATCH' : 'POST';

                        const response = await fetch(url, {
                          method: method,
                          body: formData
                        });
                        if (response.ok) {
                          const result = await response.json();
                          if (editingItem) {
                            setServices(services.map(s => s.id === result.id ? result : s));
                            setEditingItem(null);
                          } else {
                            setServices([result, ...services]);
                          }
                          document.getElementById('srv-title').value = '';
                          fileInput.value = '';
                          document.getElementById('srv-desc').value = '';
                          setFormError('');
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    } else {
                      setFormError("Please fill all fields for the service.");
                    }
                  }}>
                    {editingItem?.type === 'service' ? 'Update Service' : 'Add Service'}
                  </button>
                  {formError && activeTab === 'services' && <p className="text-danger mt-2">{formError}</p>}
                </div>
              </div>

              <div className="admin-card glass-admin">
                <div className="card-header">
                  <h3>Custom Services Management</h3>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Media Preview</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Uploaded (Date & Time)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((srv, idx) => (
                        <tr key={idx}>
                          <td data-label="Preview">
                            {srv.img && (srv.img.endsWith('.mp4') || srv.img.includes('youtube.com') || srv.img.includes('youtu.be')) ?
                              <span className="badge badge-primary">Video</span> :
                              srv.img ? (
                                <img
                                  src={srv.img.startsWith('http') || srv.img.startsWith('data:') ? srv.img : `https://dubeupholstery-1.onrender.com${srv.img}`}
                                  alt={srv.title}
                                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', display: 'inline-block' }}
                                  onClick={() => setPreviewImage(srv.img.startsWith('http') || srv.img.startsWith('data:') ? srv.img : `https://dubeupholstery-1.onrender.com${srv.img}`)}
                                />
                              ) : (
                                <div style={{ width: '60px', height: '60px', background: '#eee', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={20} className="text-muted" /></div>
                              )
                            }
                          </td>

                          <td data-label="Title" className="font-weight-600">{srv.title}</td>
                          <td data-label="Description" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{srv.desc}</td>
                          <td data-label="Uploaded" className="text-muted">{formatDateTime(srv.date)}</td>
                          <td data-label="Action">
                            <div className="d-flex gap-2 justify-content-end">
                              <button className="icon-btn text-primary" onClick={() => {
                                setEditingItem({ type: 'service', item: srv });
                                window.scrollTo(0, 0);
                              }}>
                                <Pencil size={18} />
                              </button>
                              <button className="icon-btn text-danger" onClick={async () => {
                                try {
                                  await fetch(`https://dubeupholstery-1.onrender.com/api/services/${srv.id}/`, { method: 'DELETE' });
                                  setServices(services.filter(s => s.id !== srv.id));
                                } catch (e) {
                                  console.error(e);
                                }
                              }}>
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {services.length === 0 && (
                        <tr><td colSpan="5" className="text-center py-4">No custom services added.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fabrics' && (
            <div className="admin-section">
              <div className="admin-card glass-admin mb-4">
                <div className="card-header">
                  <h3>{editingItem?.type === 'fabric' ? 'Edit Fabric' : 'Add New Fabric'}</h3>
                  {editingItem?.type === 'fabric' && <button className="btn btn-outline btn-sm" onClick={() => {
                    setEditingItem(null);
                    document.getElementById('fab-title').value = '';
                    document.getElementById('fab-desc').value = '';
                    document.getElementById('fab-file').value = '';
                  }}>Cancel Edit</button>}
                </div>
                <div className="admin-form px-3 pb-3">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input type="text" className="form-control" placeholder="Fabric Title" id="fab-title" defaultValue={editingItem?.type === 'fabric' ? editingItem.item.title : ''} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input type="file" className="form-control" id="fab-file" accept="image/*" />
                      {editingItem?.type === 'fabric' && <small className="text-muted">Leave blank to keep current image</small>}
                    </div>
                    <div className="col-md-12 mb-3">
                      <textarea className="form-control" rows="3" placeholder="Fabric Description" id="fab-desc" defaultValue={editingItem?.type === 'fabric' ? editingItem.item.description : ''}></textarea>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={async () => {
                    const title = document.getElementById('fab-title').value;
                    const fileInput = document.getElementById('fab-file');
                    const desc = document.getElementById('fab-desc').value;

                    if ((fileInput.files.length > 0 || editingItem)) {
                      try {
                        const formData = new FormData();
                        if (title) formData.append('title', title);
                        if (desc) formData.append('description', desc);
                        if (fileInput.files[0]) formData.append('image', fileInput.files[0]);

                        const url = editingItem ? `https://dubeupholstery-1.onrender.com/api/fabrics/${editingItem.item.id}/` : 'https://dubeupholstery-1.onrender.com/api/fabrics/';
                        const method = editingItem ? 'PATCH' : 'POST';

                        const response = await fetch(url, {
                          method: method,
                          body: formData
                        });
                        if (response.ok) {
                          const result = await response.json();
                          if (editingItem) {
                            setFabrics(fabrics.map(f => f.id === result.id ? result : f));
                            setEditingItem(null);
                          } else {
                            setFabrics([result, ...fabrics]);
                          }
                          document.getElementById('fab-title').value = '';
                          fileInput.value = '';
                          document.getElementById('fab-desc').value = '';
                          setFormError('');
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    } else {
                      setFormError("Please select a fabric image.");
                    }
                  }}>
                    {editingItem?.type === 'fabric' ? 'Update Fabric' : 'Add Fabric'}
                  </button>
                  {formError && activeTab === 'fabrics' && <p className="text-danger mt-2">{formError}</p>}
                </div>
              </div>

              <div className="admin-card glass-admin">
                <div className="card-header">
                  <h3>Fabric Catalog Management</h3>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Preview</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Uploaded</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fabrics.map((fab, idx) => (
                        <tr key={idx}>
                          <td data-label="Preview">
                            <img src={fab.image.startsWith('http') ? fab.image : `https://dubeupholstery-1.onrender.com${fab.image}`} alt={fab.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer', display: 'inline-block' }} onClick={() => setPreviewImage(fab.image.startsWith('http') ? fab.image : `https://dubeupholstery-1.onrender.com${fab.image}`)} />
                          </td>
                          <td data-label="Title" className="font-weight-600">{fab.title || 'N/A'}</td>
                          <td data-label="Description" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fab.description || 'N/A'}</td>
                          <td data-label="Uploaded" className="text-muted">{formatDateTime(fab.date)}</td>
                          <td data-label="Action">
                            <div className="d-flex gap-2 justify-content-end">
                              <button className="icon-btn text-primary" onClick={() => {
                                setEditingItem({ type: 'fabric', item: fab });
                                window.scrollTo(0, 0);
                              }}>
                                <Pencil size={18} />
                              </button>
                              <button className="icon-btn text-danger" onClick={async () => {
                                try {
                                  await fetch(`https://dubeupholstery-1.onrender.com/api/fabrics/${fab.id}/`, { method: 'DELETE' });
                                  setFabrics(fabrics.filter(f => f.id !== fab.id));
                                } catch (e) {
                                  console.error(e);
                                }
                              }}>
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {fabrics.length === 0 && (
                        <tr><td colSpan="5" className="text-center py-4">No fabrics added.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="admin-section">
              <div className="admin-card glass-admin" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="card-header">
                  <h3>Admin Profile Settings</h3>
                </div>
                <div className="admin-form p-4">
                  <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                      {adminProfile?.profile_picture ? (
                        <img src={adminProfile.profile_picture.startsWith('http') ? adminProfile.profile_picture : `https://dubeupholstery-1.onrender.com${adminProfile.profile_picture}`} alt="Profile" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary)' }} />
                      ) : (
                        <div className="admin-avatar" style={{ width: 120, height: 120, fontSize: '3rem' }}>A</div>
                      )}
                      <button className="btn btn-sm btn-primary position-absolute" style={{ bottom: 0, right: 0, borderRadius: '50%', width: 36, height: 36, padding: 0 }} onClick={() => fileInputRef.current.click()}>
                        <Pencil size={16} />
                      </button>
                      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleProfileUpload} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted">Username</label>
                    <input type="text" className="form-control" id="prof-username" defaultValue={adminProfile?.user?.username || ''} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Full Name / First Name</label>
                    <input type="text" className="form-control" id="prof-name" defaultValue={adminProfile?.user?.first_name || ''} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Email Address</label>
                    <input type="email" className="form-control" id="prof-email" defaultValue={adminProfile?.user?.email || ''} />
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted">New Password (leave blank to keep current)</label>
                    <input type="password" class="form-control" id="prof-pass" placeholder="••••••••" />
                  </div>

                  <button className="btn btn-primary w-100" onClick={async () => {
                    const username = document.getElementById('prof-username').value;
                    const name = document.getElementById('prof-name').value;
                    const email = document.getElementById('prof-email').value;
                    const pass = document.getElementById('prof-pass').value;

                    try {
                      const payload = {
                        user: {
                          username: username,
                          first_name: name,
                          email: email,
                          password: pass || undefined
                        }
                      };
                      const response = await fetch(`https://dubeupholstery-1.onrender.com/api/profiles/${adminProfile.id}/`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                      });
                      if (response.ok) {
                        const updated = await response.json();
                        setAdminProfile(updated);
                        alert("Profile updated successfully!");
                        if (pass) document.getElementById('prof-pass').value = '';
                      } else {
                        const errData = await response.json();
                        alert(`Failed to update profile: ${JSON.stringify(errData)}`);
                      }
                    } catch (e) {
                      console.error(e);
                      alert("Failed to update profile due to network error");
                    }
                  }}>Save Changes</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
