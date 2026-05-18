const onboardChrome = (active) => `
  <div class="onboard-top">
    <span class="skip">Skip</span>
    <div class="dots">${[0,1,2,3].map(i=>`<span class="dot${i===active?' active':''}"></span>`).join('')}</div>
    <span class="next-circle">→</span>
  </div>`;

const phone = (content) => `<div class="phone-mock"><div class="phone-inner">${content}</div></div>`;

const kamyaNav = (active=0) => `
  <nav class="kamya-nav">
    ${['Home','Astrologer','Find Love','Forum','Profile'].map((l,i)=>`<a class="${i===active?'active':''}"><span>${['⌂','☆','♡','◈','◉'][i]}</span>${l}</a>`).join('')}
  </nav>`;

const SCREENS = [
  {
    id: 'splash', name: '01 Splash',
    html: `<div class="cosmic-bg">
      <div class="planet"></div>
      <div class="mandala"><div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div>
        <span class="zs">♈</span><span class="zs z2">♉</span><span class="zs z3">♊</span><span class="zs z4">♋</span>
        <span class="zs z5">♌</span><span class="zs z6">♍</span><span class="zs z7">♎</span><span class="zs z8">♏</span>
        <span class="core">✦</span>
      </div>
      <div class="brand-bottom"><span class="moon-icon">☽<i class="bindu"></i></span><h1 class="kamya-title">KAMYA</h1>
      <p class="kamya-tag">FROM DARKNESS TO DIVINE LIGHT</p></div>
    </div>`,
  },
  {
    id: 'onboard1', name: '02 Onboarding 1',
    html: `${onboardChrome(0)}<div class="cosmic-bg onboard">
      <h2 class="gold-h">Discover Your Destiny</h2>
      <p class="body-w">Unveil the cosmic patterns shaping your life and step into alignment with your true path.</p>
      ${phone(`<p class="ph-title">Chat</p>
        <div class="w-bubble">Namaste! Share your birth details.</div>
        <div class="w-bubble me">DOB: 15 Mar 1995, Mumbai</div>
        <div class="w-bubble">Chant Om Suryaya Namaha for strength.</div>`)}
    </div>`,
  },
  {
    id: 'onboard2', name: '02 Onboarding 2',
    html: `${onboardChrome(1)}<div class="cosmic-bg onboard">
      <h2 class="gold-h">Connect with Expert Astrologers</h2>
      <p class="body-w">Consult experienced astrologers, tarot readers and spiritual healers for personalized guidance.</p>
      ${phone(`<p class="ph-title">Astrologers</p>
        <div class="w-card"><strong>Aditi</strong><br>Tarot · ★5 · ₹60/min</div>
        <div class="w-card"><strong>Raj</strong><br>Vedic · ★4.9</div>`)}
    </div>`,
  },
  {
    id: 'onboard3', name: '02 Onboarding 3',
    html: `${onboardChrome(2)}<div class="cosmic-bg onboard">
      <h2 class="gold-h">Daily Guidance & Remedies</h2>
      <p class="body-w">Receive daily insights, remedies, and spiritual practices to elevate your life.</p>
      ${phone(`<p class="lock-time">11:11</p><p class="lock-date">Friday, 11 March 2026</p>
        <div class="w-card"><b>Pisces</b><br>Today focuses on balancing emotions and finances.</div>
        <div class="w-card"><b>Astrologer is Live</b><br>Real-time guidance available now.</div>`)}
    </div>`,
  },
  {
    id: 'onboard4', name: '02 Onboarding 4',
    html: `${onboardChrome(3)}<div class="cosmic-bg onboard">
      <h2 class="gold-h">Spiritual Journal</h2>
      <p class="body-w">A sacred space to reflect, record your thoughts, and stay aligned with your inner self.</p>
      ${phone(`<p class="ph-title">Spiritual Journal</p>
        <div class="w-card"><p>Today I pause and listen within...</p><small>06/04/2026</small><em>Read More...</em></div>
        <div class="w-card"><p>The universe whispers patience...</p></div>
        <p class="new-entry">or Start a new one +</p>`)}
    </div>`,
  },
  {
    id: 'login', name: '03 Login',
    html: `<div class="cosmic-bg login-sc">
      <div class="logo-block"><span class="moon-icon">☽<i class="bindu"></i></span><h1 class="kamya-title sm">KAMYA</h1>
      <p class="kamya-tag sm">FROM DARKNESS TO DIVINE LIGHT</p><div class="divider-star">✦</div>
      <h2 class="gold-h center">Welcome to Kamya</h2>
      <p class="body-w center">Talk. Connect. Understand. Align with the universe</p>
      <div class="purple-group"><div class="pg-row">✉ Email or Phone Number</div><div class="pg-line"></div><div class="pg-row">🔒 Password <span class="eye">👁</span></div></div>
      <p class="forgot">Forgot password?</p>
      <button class="pill-gold">Sign in</button>
      <p class="or">or continue with</p>
      <div class="social-row"><div class="soc">Apple</div><div class="soc">Google</div><div class="soc">Facebook</div></div>
      <p class="foot-link">Don't have an account? <b>Sign up →</b></p>
    </div>`,
  },
  {
    id: 'signup', name: '04 Signup',
    html: `<div class="cosmic-bg signup-sc">
      <h2 class="gold-h center">Create Your Kamya Account</h2>
      <p class="body-w center">Begin your journey of self-discovery and align with your true path.</p>
      <input class="kamya-in" placeholder="Full Name" />
      <div class="kamya-in row"><span>📅 Select Date</span><span>🕐 Time: 04:30 PM</span></div>
      <input class="kamya-in" placeholder="Place of Birth" />
      <input class="kamya-in" placeholder="Email Address / Phone Number" />
      <input class="kamya-in" placeholder="Password" />
      <input class="kamya-in" placeholder="Confirm Password" />
      <p class="secure-note">Your information is secure and kept private.</p>
      <button class="pill-gold">Sign up</button>
      <p class="foot-link center">Already have an account? <b>Sign in →</b></p>
    </div>`,
  },
  {
    id: 'home', name: '05 Home',
    html: `<div class="cosmic-bg home-sc">
      <header class="kamya-header"><button class="icon-btn">☰</button><h1 class="kamya-title xs">KAMYA</h1>
      <span>🔔</span><span>💬</span></header>
      <div class="search-pill">🔍 Search astrologers, horoscope...</div>
      <div class="svc-row">${['Horoscope','Kundli','Tarot','Panchang','Matching'].map(s=>`<div class="svc"><span>✦</span>${s}</div>`).join('')}</div>
      <div class="promo-card"><p><b>Confused about Career or Business?</b></p><p>Let the stars guide your path.</p></div>
      <h3 class="sec-gold">Consult a Jyotish Acharya <span>View all →</span></h3>
      <div class="astro-card-w"><div class="av"></div><div><b>Aditi</b><br>★ 4.0 · Chat ₹5 · Call ₹9</div></div>
      ${kamyaNav(0)}
    </div>`,
  },
  {
    id: 'drawer', name: '06 Drawer',
    html: `<div class="cosmic-bg drawer-sc">
      <div class="drawer-dim"></div>
      <aside class="drawer-panel">
        <div class="drawer-user"><div class="av lg"></div><div><b>Tanya</b><br><small>ID: CUS000001</small></div><span>🔔</span></div>
        ${['My Profile','Orders','Journal','Forum','Chat History','Chat with Astrologer','Sign up as Astrologer','Shop','About Kamya','Privacy Policy','Contact Us','Logout'].map(i=>`<div class="drawer-item${i==='Logout'?' red':''}">${i}</div>`).join('')}
        <div class="social-circles">f ◎ ✦ ☆</div>
      </aside>
    </div>`,
  },
  {
    id: 'astrologers', name: '07 Astrologer List',
    html: `<div class="cosmic-bg"><h2 class="gold-h">Our Astrologers</h2>
      <div class="chips">${['All','Tarot','Vedic'].map((c,i)=>`<span class="chip${i===0?' on':''}">${c}</span>`).join('')}</div>
      <div class="w-card astro"><div class="av"></div><div><b>Aditi</b><br>Tarot · ★5 · ₹60/min</div></div>
      ${kamyaNav(1)}</div>`,
  },
  {
    id: 'chat', name: '09 Chat',
    html: `<div class="cosmic-bg chat-sc">
      <div class="chat-hdr">← <b>Aditi</b> <small class="online">● Online</small> <span>📞📹</span></div>
      <div class="w-bubble">Namaste! Share your birth details.</div>
      <div class="w-bubble me">Career guidance please.</div>
      <div class="chat-bar">🎤 📎 Type... <span class="send">➤</span></div>
    </div>`,
  },
  {
    id: 'kundali', name: '10 Kundali',
    html: `<div class="cosmic-bg pad"><h2 class="gold-h">Kundali Matching</h2>
      <p class="lbl-g">Bride Details</p><input class="kamya-in" placeholder="Date of Birth" />
      <p class="lbl-g">Groom Details</p><input class="kamya-in" placeholder="Date of Birth" />
      <button class="pill-gold">Generate Compatibility Report</button></div>`,
  },
  {
    id: 'horoscope', name: '11 Horoscope',
    html: `<div class="cosmic-bg pad"><h2 class="gold-h">Daily Horoscope</h2>
      <div class="z-row">${['♈','♉','♊','♋','♌','♍'].map((z,i)=>`<span class="z${i===0?' on':''}">${z}</span>`).join('')}</div>
      <div class="glass-card"><h3 class="gold-h">Pisces — Today</h3><p class="body-w">Balance emotional comfort with practical decisions.</p></div>
      ${kamyaNav(0)}</div>`,
  },
  {
    id: 'admin', name: '18 Admin',
    html: `<div class="admin-mobile">
      <header class="admin-header">
        <h1 class="admin-brand">KAMYA</h1>
        <p class="admin-sub">Admin Panel</p>
      </header>
      <nav class="admin-tabs">
        <span class="admin-tab active">Dashboard</span>
        <span class="admin-tab">Users</span>
        <span class="admin-tab">Revenue</span>
      </nav>
      <section class="admin-content">
        <h2 class="admin-title">Dashboard Overview</h2>
        <div class="admin-metrics">
          <div class="admin-metric-card">
            <span class="admin-metric-val">12.4k</span>
            <span class="admin-metric-lbl">Users</span>
          </div>
          <div class="admin-metric-card">
            <span class="admin-metric-val">342</span>
            <span class="admin-metric-lbl">Astrologers</span>
          </div>
          <div class="admin-metric-card">
            <span class="admin-metric-val">₹8.4L</span>
            <span class="admin-metric-lbl">Revenue</span>
          </div>
          <div class="admin-metric-card">
            <span class="admin-metric-val">1,204</span>
            <span class="admin-metric-lbl">Bookings Today</span>
          </div>
        </div>
        <div class="admin-chart">
          <p class="admin-chart-title">Revenue Analytics</p>
          <div class="admin-bars">
            <span style="height:40%"></span><span style="height:65%"></span><span style="height:50%"></span>
            <span style="height:80%"></span><span style="height:55%"></span><span style="height:90%"></span>
          </div>
        </div>
      </section>
    </div>`,
  },
];
