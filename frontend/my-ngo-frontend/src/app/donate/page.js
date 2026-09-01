"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getAllDonationCampaigns } from "../../api/donation-campaigns";
import { verifyDonation } from "../../api/donations";
import { STRAPI_BASE_URL } from "../../api/strapi";
import Script from "next/script";
import "./donate.css";

export default function DonatePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await getAllDonationCampaigns();
        console.log("✅ Donation campaigns fetched:", response);

        if (response.data && response.data.length > 0) {
          // Filter only live campaigns
          const liveCampaigns = response.data.filter(
            (campaign) => campaign.donationStatus === "Live"
          );
          setCampaigns(liveCampaigns);

          // Auto-select first campaign if available
          if (liveCampaigns.length > 0) {
            setSelectedCampaign(liveCampaigns[0]);
          }
        }
      } catch (error) {
        console.error("❌ Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Calculate percentage raised
  const getProgressPercentage = (raised, goal) => {
    if (!raised || !goal) return 0;
    return Math.min((Number(raised) / Number(goal)) * 100, 100);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Handle donation amount selection
  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };

  // Handle custom amount
  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    setDonationAmount("");
  };

  // Handle Paystack checkout
  const handleDonate = (e) => {
    e.preventDefault();

    const amount = donationAmount || customAmount;
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    if (!donorInfo.email || !donorInfo.name) {
      alert("Please provide your name and email");
      return;
    }

    if (!publicKey) {
      alert(
        "Payment is not configured yet. Please add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in your environment variables."
      );
      return;
    }

    if (typeof window === "undefined" || !window.PaystackPop) {
      alert("Payment gateway is still loading. Please refresh and try again.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: donorInfo.email,
      amount: amount * 100,
      currency: "NGN",
      ref: "MNOF_" + Math.floor(Math.random() * 1000000000 + 1),
      metadata: {
        full_name: donorInfo.name,
        phone_number: donorInfo.phone,
        custom_fields: [
          {
            display_name: "Campaign",
            variable_name: "campaign",
            value: selectedCampaign?.description || "General Fund",
          },
          {
            display_name: "Campaign ID",
            variable_name: "campaign_id",
            value: selectedCampaign?.id || "general",
          },
        ],
      },
      callback: async function (response) {
        console.log("Payment successful!", response);
        try {
          await verifyDonation({
            reference: response.reference,
            name: donorInfo.name,
            phone: donorInfo.phone,
            email: donorInfo.email,
            campaignId: selectedCampaign?.documentId || selectedCampaign?.id,
          });
          alert("Payment successful! Reference: " + response.reference);
          // Refresh campaigns so the raised amount updates
          window.location.reload();
        } catch (error) {
          console.error("❌ Failed to record donation:", error);
          alert(
            "Payment was received, but we couldn't record it automatically. Please contact us with reference: " +
              response.reference
          );
        }
      },
      onClose: function () {
        console.log("Payment window closed.");
      },
    });

    handler.openIframe();
  };

  const suggestedAmounts = [5000, 10000, 25000, 50000, 100000];

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" />
      <Navbar />

      <div className="donate-page">
        {/* Hero Section */}
        <section className="donate-hero">
          <div className="donate-hero-content">
            <h1 className="donate-hero-title">Invest in Maritime Futures</h1>
            <div className="donate-hero-line"></div>
            <p className="donate-hero-subtitle">
              Your support helps empower women and youth through education,
              mentorship, awareness, and access to opportunity in the maritime sector.
            </p>
          </div>
        </section>

        <div className="donate-container">
          {loading ? (
            <div className="donate-loading">
              <p>Loading donation campaigns...</p>
            </div>
          ) : (
            <div className="donate-content">
              {/* Campaigns List */}
              <div className="donate-campaigns-section">
                <h2 className="donate-section-title">Active Campaigns</h2>

                {campaigns.length > 0 ? (
                  <div className="donate-campaigns-list">
                    {campaigns.map((campaign) => {
                      const progressPercentage = getProgressPercentage(
                        campaign.raised || 0,
                        campaign.goal
                      );
                      const isSelected = selectedCampaign?.id === campaign.id;
                      const mediaUrl = campaign.media?.url
                        ? campaign.media.url.startsWith("http")
                          ? campaign.media.url
                          : `${STRAPI_BASE_URL}${campaign.media.url}`
                        : null;

                      return (
                        <div
                          key={campaign.id}
                          className={`donate-campaign-card ${
                            isSelected ? "selected" : ""
                          }`}
                          onClick={() => setSelectedCampaign(campaign)}
                        >
                          {mediaUrl && (
                            <div className="donate-campaign-image">
                              <Image
                                src={mediaUrl}
                                alt={campaign.description || "Campaign"}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </div>
                          )}

                          <div className="donate-campaign-content">
                            <p className="donate-campaign-description">
                              {campaign.description || "Support our mission"}
                            </p>

                            <div className="donate-campaign-stats">
                              <div className="donate-stat">
                                <span className="donate-stat-label">
                                  Raised
                                </span>
                                <span className="donate-stat-value">
                                  {formatCurrency(campaign.raised || 0)}
                                </span>
                              </div>
                              <div className="donate-stat">
                                <span className="donate-stat-label">Goal</span>
                                <span className="donate-stat-value">
                                  {formatCurrency(campaign.goal)}
                                </span>
                              </div>
                            </div>

                            <div className="donate-progress-container">
                              <div className="donate-progress-bar">
                                <div
                                  className="donate-progress-fill"
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                              <span className="donate-progress-text">
                                {progressPercentage.toFixed(0)}% funded
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="donate-empty">
                    <p>
                      No active campaigns at the moment. Your donations still
                      help us continue our mission!
                    </p>
                  </div>
                )}
              </div>

              {/* Donation Form */}
              <div className="donate-form-section">
                <div className="donate-form-card">
                  <h2 className="donate-section-title">Your Donation</h2>

                  {selectedCampaign && (
                    <div className="donate-selected-campaign">
                      <p className="donate-selected-label">Donating to:</p>
                      <p className="donate-selected-name">
                        {selectedCampaign.description || "General Fund"}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleDonate}>
                    {/* Suggested Amounts */}
                    <div className="donate-amount-section">
                      <label className="donate-label">Select Amount</label>
                      <div className="donate-amount-grid">
                        {suggestedAmounts.map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            className={`donate-amount-btn ${
                              donationAmount === amount ? "active" : ""
                            }`}
                            onClick={() => handleAmountSelect(amount)}
                          >
                            {formatCurrency(amount)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div className="donate-input-group">
                      <label className="donate-label">
                        Or Enter Custom Amount
                      </label>
                      <input
                        type="number"
                        className="donate-input"
                        placeholder="Enter amount in Naira"
                        value={customAmount}
                        onChange={(e) => handleCustomAmount(e.target.value)}
                        min="100"
                      />
                    </div>

                    {/* Donor Information */}
                    <div className="donate-divider"></div>

                    <div className="donate-input-group">
                      <label className="donate-label">Full Name *</label>
                      <input
                        type="text"
                        className="donate-input"
                        placeholder="Enter your name"
                        value={donorInfo.name}
                        onChange={(e) =>
                          setDonorInfo({ ...donorInfo, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="donate-input-group">
                      <label className="donate-label">Email Address *</label>
                      <input
                        type="email"
                        className="donate-input"
                        placeholder="Enter your email"
                        value={donorInfo.email}
                        onChange={(e) =>
                          setDonorInfo({ ...donorInfo, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="donate-input-group">
                      <label className="donate-label">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        className="donate-input"
                        placeholder="Enter your phone number"
                        value={donorInfo.phone}
                        onChange={(e) =>
                          setDonorInfo({ ...donorInfo, phone: e.target.value })
                        }
                      />
                    </div>

                    {/* Donate Button */}
                    <button type="submit" className="donate-submit-btn">
                      <span>
                        Donate{" "}
                        {donationAmount || customAmount
                          ? formatCurrency(donationAmount || customAmount)
                          : "Now"}
                      </span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>

                    <p className="donate-secure-note">
                      🔒 Secure payment powered by Paystack
                    </p>
                  </form>
                </div>

                {/* Impact Information */}
                <div className="donate-impact-card">
                  <h3 className="donate-impact-title">Your Impact</h3>
                  <div className="donate-impact-list">
                    <div className="donate-impact-item">
                      <div className="donate-impact-icon">₦5,000</div>
                      <p className="donate-impact-text">
                        Supports one awareness or mentorship outreach activity.
                      </p>
                    </div>
                    <div className="donate-impact-item">
                      <div className="donate-impact-icon">₦25,000</div>
                      <p className="donate-impact-text">
                        Helps fund a skills or career development session for youth and women.
                      </p>
                    </div>
                    <div className="donate-impact-item">
                      <div className="donate-impact-icon">₦100,000</div>
                      <p className="donate-impact-text">
                        Contributes to training, scholarship support, and maritime opportunity pathways.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
