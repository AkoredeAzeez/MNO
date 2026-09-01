'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllEvents } from '../api/events';
import { STRAPI_BASE_URL } from '../api/strapi';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        console.log('✅ Events fetched:', response);
        
        if (response.data && response.data.length > 0) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error('❌ Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get event status
  const getEventStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;

    if (endDate && now > endDate) {
      return { text: 'Past Event', color: 'gray' };
    } else if (now >= startDate && (!endDate || now <= endDate)) {
      return { text: 'Ongoing', color: 'green' };
    } else {
      return { text: 'Upcoming', color: 'blue' };
    }
  };

  return (
    <section id="events" className="section-container8">
      <div className="container8">
        <div className="section-header8">
          <h2 className="section-title8">
            {events.length > 0 ? 'Our Events' : 'Upcoming Events'}
          </h2>
          <div className="section-gradient-line8"></div>
          <p className="section-subtitle8">
            {events.length > 0 
              ? 'Join us at our events and be part of the artistic journey.' 
              : 'Join us at our upcoming events and be part of the artistic journey.'}
          </p>
        </div>
        
        {loading ? (
          <div className="text-center8" style={{ padding: '3rem 0' }}>
            <p className="card-description8">Loading events...</p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid-38 stagger-children8">
            {events.map((event, index) => {
              const status = getEventStatus(event.start, event.end);
              const coverImageUrl = event.coverImage?.url 
                ? (event.coverImage.url.startsWith('http') 
                    ? event.coverImage.url 
                    : `${STRAPI_BASE_URL}${event.coverImage.url}`)
                : null;

              return (
                <div key={event.id} className="card-base8 card-hover8 interactive-glow8" style={{ animationDelay: `${index * 0.1}s` }}>
                  {/* Event Image */}
                  {coverImageUrl && (
                    <div style={{ 
                      position: 'relative', 
                      width: '100%', 
                      height: '200px', 
                      borderRadius: '12px 12px 0 0',
                      overflow: 'hidden',
                      marginBottom: '1rem'
                    }}>
                      <Image
                        src={coverImageUrl}
                        alt={event.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      {/* Status Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: status.color === 'green' ? '#4caf50' : status.color === 'blue' ? '#2196f3' : '#9e9e9e',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {status.text}
                      </div>
                    </div>
                  )}

                  {/* Event Icon (if no image) */}
                  {!coverImageUrl && (
                    <div className="card-icon8">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                    </div>
                  )}

                  <h3 className="card-title8">{event.title}</h3>
                  
                  {/* Date & Time */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    marginBottom: '0.5rem',
                    color: '#8bc34a',
                    fontSize: '0.875rem'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <span>{formatDate(event.start)}</span>
                  </div>

                  {/* Venue */}
                  {event.venue && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      marginBottom: '0.75rem',
                      color: '#666',
                      fontSize: '0.875rem'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>{event.venue.location || event.venue.name}</span>
                    </div>
                  )}

                  {/* Description */}
                  {event.description && (
                    <p className="card-description8">
                      {event.description.replace(/<[^>]*>/g, '').substring(0, 120)}
                      {event.description.length > 120 ? '...' : ''}
                    </p>
                  )}

                  {/* Capacity & RSVP Info */}
                  {event.capacity && (
                    <div style={{ 
                      marginTop: '1rem',
                      padding: '0.5rem',
                      background: '#f5f5f5',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#666'
                    }}>
                      <span>Capacity: {event.capacity} attendees</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center8" style={{ padding: '3rem 0' }}>
            <p className="card-description8">No events available at the moment.</p>
          </div>
        )}
        
        {/* Call to Action */}
        <div className="text-center8 fade-in-up8" style={{animationDelay: '0.3s'}}>
          <div className="card-base8 cta-card8">
            <h3 className="card-title8">Stay Connected</h3>
            <p className="card-description8 mb-24-8">
              Do not miss out on our upcoming events! Follow us on social media for the latest updates and exclusive previews.
            </p>
            <div className="feature-list8">
              <div className="feature-item8">
                <div className="feature-dot8"></div>
                <span className="feature-text8">Early access to event announcements</span>
              </div>
              <div className="feature-item8">
                <div className="feature-dot8"></div>
                <span className="feature-text8">Behind-the-scenes content</span>
              </div>
              <div className="feature-item8">
                <div className="feature-dot8"></div>
                <span className="feature-text8">Exclusive artist interviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}