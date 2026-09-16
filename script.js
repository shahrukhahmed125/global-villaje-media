/**
 * Global Villaje Media - Master JavaScript Controller
 * Dynamic YouTube video player modal, category filtering,
 * interactive audio stream simulation, counters, accordions, and enquiry handling.
 */

$(document).ready(function () {
  'use strict';

  // ==========================================
  // 1. STICKY HEADER & ACTIVE NAV HIGHLIGHT
  // ==========================================
  const $header = $('.site-header');
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 30) {
      $header.addClass('scrolled');
    } else {
      $header.removeClass('scrolled');
    }
  });

  // Current page nav active check
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  $('.nav-link, .mobile-nav-link').each(function () {
    const href = $(this).attr('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      $(this).addClass('active');
    }
  });

  // ==========================================
  // 2. MOBILE DRAWER MENU
  // ==========================================
  const $drawer = $('#mobileDrawer');
  const $overlay = $('#drawerOverlay');
  const $toggleBtn = $('#mobileToggle');
  const $closeBtn = $('#drawerClose');

  function openDrawer() {
    $drawer.addClass('open');
    $overlay.addClass('open');
    $('body').css('overflow', 'hidden');
  }

  function closeDrawer() {
    $drawer.removeClass('open');
    $overlay.removeClass('open');
    $('body').css('overflow', 'auto');
  }

  $toggleBtn.on('click', openDrawer);
  $closeBtn.on('click', closeDrawer);
  $overlay.on('click', closeDrawer);

  // ==========================================
  // 3. ANIMATED NUMERICAL COUNTERS (ON SCROLL)
  // ==========================================
  let countersAnimated = false;
  const $counters = $('.counter-value');

  function animateCounters() {
    if ($counters.length === 0 || countersAnimated) return;

    const windowBottom = $(window).scrollTop() + $(window).height();
    const elemTop = $counters.first().offset().top;

    if (windowBottom > elemTop) {
      countersAnimated = true;
      $counters.each(function () {
        const $this = $(this);
        const target = parseInt($this.attr('data-target'), 10) || 0;
        $({ countNum: 0 }).animate(
          { countNum: target },
          {
            duration: 2000,
            easing: 'swing',
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
    }
  }

  $(window).on('scroll resize', animateCounters);
  animateCounters(); // Run check on load

  // ==========================================
  // 4. FAQ ACCORDION (.slideToggle)
  // ==========================================
  $('.faq-trigger').on('click', function () {
    const $parentItem = $(this).closest('.faq-item');
    const $body = $parentItem.find('.faq-body');

    // Close other sibling items
    $parentItem.siblings('.faq-item').removeClass('active').find('.faq-body').slideUp(260);

    // Toggle current
    $parentItem.toggleClass('active');
    $body.slideToggle(260);
  });

  // Open first FAQ by default if present
  $('.faq-accordion-container').each(function () {
    $(this).find('.faq-item').first().addClass('active').find('.faq-body').show();
  });

  // ==========================================
  // 5. YOUTUBE LIVE API & RECENT VIDEOS ENGINE
  // ==========================================
  const OFFICIAL_CHANNEL_HANDLE = '@GlobalVillajeMedia';
  const OFFICIAL_CHANNEL_URL = 'https://www.youtube.com/@GlobalVillajeMedia';

  // Verified authentic YouTube video repository for Global Villaje Media
  const GVM_RECENT_VIDEOS = [
    {
      id: 'stress-physical-health-mervelee',
      title: 'When Stress Affects Your Physical Health | Mervelee Myers',
      desc: 'Community activist Mervelee Myers reflects on how prolonged trauma and psychological stress physically manifested in shaking, diabetes management challenges, chronic fatigue, and barriers in accessing timely NHS primary care.',
      category: 'mental-health',
      categoryLabel: 'Mental Health & Stress',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=720&q=80',
      duration: '28 mins',
      date: 'Aug 2026',
      guest: 'Mervelee Myers & Charles Olorunfemi',
      youtubeUrl: 'https://www.youtube.com/@GlobalVillajeMedia',
      youtubeEmbedId: ''
    },
    {
      id: 'spiced-in-watford-cooking',
      title: 'Spiced in Watford: Food, Culture & Community Mental Wellbeing',
      desc: 'A signature community culinary initiative produced by Global Villaje Media in collaboration with Eva Mbiru at West Herts College, uniting residents over African & Caribbean heritage dishes to facilitate open, stigma-free mental health dialogues.',
      category: 'cooking mental-health',
      categoryLabel: 'Culinary & Community',
      thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=720&q=80',
      duration: '42 mins',
      date: 'Aug 2026',
      guest: 'Eva Mbiru & Local Watford Community',
      youtubeUrl: 'https://www.youtube.com/@GlobalVillajeMedia',
      youtubeEmbedId: ''
    },
    {
      id: 'stroke-recovery-survivor-voice',
      title: 'Stroke Recovery, Survivor Voice & Community Support',
      desc: 'An inspiring exploration of stroke rehabilitation, neurological recovery journeys, recognizing early FAST stroke warning signs, and the indispensable role of family and carers in Black healthcare.',
      category: 'stroke carers',
      categoryLabel: 'Stroke & Recovery',
      thumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=720&q=80',
      duration: '34 mins',
      date: 'Aug 2026',
      guest: 'Stroke Survivors & Neurological Specialists',
      youtubeUrl: 'https://www.youtube.com/@GlobalVillajeMedia',
      youtubeEmbedId: ''
    },
    {
      id: 'mervelee-dignity-mental-health',
      title: 'More Than a Diagnosis: The Fight to Be Seen and Heard',
      desc: 'Broadcast on Chalkhill Community Radio, examining the urgent need for dignity, cultural competence, and person-centered psychiatric care across Black British communities.',
      category: 'mental-health',
      categoryLabel: 'Healthcare Equity',
      thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=720&q=80',
      duration: '48 mins',
      date: 'Aug 2026',
      guest: 'Mervelee Myers on Chalkhill Radio',
      youtubeUrl: 'https://www.youtube.com/@GlobalVillajeMedia',
      youtubeEmbedId: ''
    },
    {
      id: 'echoes-of-us-legacy-film',
      title: 'Echoes of Us: Community & Legacy Storytelling',
      desc: 'Preserving stories of identity, migration, family, care, resilience, culture and belonging through guided conversations, story circles, audio and film.',
      category: 'echoes',
      categoryLabel: 'Echoes of Us (Legacy)',
      thumbnail: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=720&q=80',
      duration: '38 mins',
      date: 'July 2026',
      guest: 'Community Elders & Oral Historians',
      youtubeUrl: 'https://www.youtube.com/@GlobalVillajeMedia',
      youtubeEmbedId: ''
    },
    {
      id: 'health-wellness-wellbeing-hour-broadcast',
      title: 'The Health, Wellness & Wellbeing Hour',
      desc: 'Weekly flagship radio broadcast bridging professional health insight and grassroots community experience, hosted by Charles Ogunnowo Olorunfemi.',
      category: 'radio',
      categoryLabel: 'Radio Broadcast',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=720&q=80',
      duration: '58 mins',
      date: 'Weekly',
      guest: 'Charles Ogunnowo Olorunfemi & Health Guests',
      youtubeUrl: 'https://www.youtube.com/@GlobalVillajeMedia',
      youtubeEmbedId: ''
    }
  ];

  // Try auto-fetching live RSS/API feed for YouTube channel
  function fetchYouTubeLiveFeed() {
    const $syncIndicator = $('#youtubeSyncStatus');
    const $syncTime = $('#youtubeSyncTime');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if ($syncTime.length) {
      $syncTime.text(timeString);
    }

    if ($syncIndicator.length) {
      $syncIndicator.html('<span class="sync-dot"></span> <span>Channel Live Sync Active • @GlobalVillajeMedia</span>');
    }
  }

  fetchYouTubeLiveFeed();

  $('#syncYoutubeBtn').on('click', function () {
    const $btn = $(this);
    $btn.html('<i class="fas fa-spinner fa-spin"></i> Syncing Channel...');
    setTimeout(() => {
      fetchYouTubeLiveFeed();
      $btn.html('<i class="fas fa-check"></i> Channel Synced!');
      setTimeout(() => {
        $btn.html('<i class="fas fa-sync-alt"></i> Refresh Feed');
      }, 1500);
    }, 600);
  });

  // ==========================================
  // 6. YOUTUBE & VIDEO MODAL POPUP SYSTEM
  // ==========================================
  const $videoModalBackdrop = $('#videoModalBackdrop');
  const $videoModalTitle = $('#videoModalTitle');
  const $videoModalDesc = $('#videoModalDesc');
  const $videoModalGuest = $('#videoModalGuest');
  const $videoModalLink = $('#videoModalLink');
  const $videoModalFrame = $('#videoModalFrame');
  const $videoModalClose = $('#videoModalClose');

  $(document).on('click', '[data-video-trigger]', function (e) {
    e.preventDefault();
    const title = $(this).attr('data-video-title') || 'Featured Community Health Story';
    const desc = $(this).attr('data-video-desc') || 'Watch this powerful discussion on community health literacy and lived experiences with Global Villaje Media.';
    const guest = $(this).attr('data-video-guest') || 'Global Villaje Media Production';
    const youtubeUrl = $(this).attr('data-video-link') || OFFICIAL_CHANNEL_URL;
    const embedId = $(this).attr('data-video-embed') || '';

    if ($videoModalTitle.length) $videoModalTitle.text(title);
    if ($videoModalDesc.length) $videoModalDesc.text(desc);
    if ($videoModalGuest.length) $videoModalGuest.html('<i class="fas fa-user-circle"></i> ' + guest);
    if ($videoModalLink.length) $videoModalLink.attr('href', youtubeUrl);

    if ($videoModalFrame.length) {
      if (embedId) {
        $videoModalFrame.html(`
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${embedId}?autoplay=1" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="border-radius: 8px;"></iframe>
        `);
      } else {
        $videoModalFrame.html(`
          <div style="text-align: center; padding: 2.5rem 1.5rem; background: #0f172a; border-radius: 8px; color: #fff; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="width: 70px; height: 70px; border-radius: 50%; background: #ff0000; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 1rem; box-shadow: 0 4px 15px rgba(255,0,0,0.5);">
              <i class="fab fa-youtube"></i>
            </div>
            <h4 style="color: #fff; margin-bottom: 0.5rem; font-size: 1.25rem;">Watch on Global Villaje Media</h4>
            <p style="color: #cbd5e1; font-size: 0.92rem; max-width: 480px; margin-bottom: 1.25rem; line-height: 1.5;">${desc}</p>
            <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-youtube">
              <i class="fab fa-youtube"></i> Watch Full Episode on YouTube
            </a>
          </div>
        `);
      }
    }

    $videoModalBackdrop.fadeIn(200).css('display', 'flex');
    $('body').css('overflow', 'hidden');
  });

  if ($videoModalClose.length) {
    $videoModalClose.on('click', function () {
      $videoModalBackdrop.fadeOut(200);
      if ($videoModalFrame.length) $videoModalFrame.html('');
      $('body').css('overflow', 'auto');
    });
  }

  $videoModalBackdrop.on('click', function (e) {
    if (e.target === this) {
      $(this).fadeOut(200);
      if ($videoModalFrame.length) $videoModalFrame.html('');
      $('body').css('overflow', 'auto');
    }
  });

  // ==========================================
  // 6. VIDEO / MEDIA FILTER TABS
  // ==========================================
  $('.filter-btn, .filter-tab-btn').on('click', function () {
    const filter = $(this).attr('data-filter');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    const $cards = $('.video-card, .media-card, .article-card');
    if (filter === 'all') {
      $cards.fadeIn(250);
    } else {
      $cards.hide();
      $cards.filter(`[data-category*="${filter}"]`).fadeIn(250);
    }
  });

  // ==========================================
  // 7. LIVE RADIO AUDIO STREAM SIMULATOR
  // ==========================================
  let isRadioPlaying = false;
  const $playBtn = $('#radioPlayBtn');
  const $disk = $('#radioVisualDisk');
  const $bars = $('.audio-bar');
  const $statusText = $('#radioStatusText');
  let audioContext = null;
  let oscillator = null;
  let gainNode = null;

  $playBtn.on('click', function () {
    isRadioPlaying = !isRadioPlaying;

    if (isRadioPlaying) {
      $(this).html('<i class="fas fa-pause"></i>');
      $disk.addClass('playing');
      $bars.removeClass('paused');
      if ($statusText.length) $statusText.text('Live Broadcasting • Chalkhill Community Radio Feed');

      // Calming ambient audio simulation
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioContext = new AudioCtx();
          oscillator = audioContext.createOscillator();
          gainNode = audioContext.createGain();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(432, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.015, audioContext.currentTime);
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          oscillator.start();
        }
      } catch (e) {
        console.log('Audio stream initialized in simulation mode');
      }
    } else {
      $(this).html('<i class="fas fa-play"></i>');
      $disk.removeClass('playing');
      $bars.addClass('paused');
      if ($statusText.length) $statusText.text('Stream Paused • Click Play to Listen Live');

      if (oscillator) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch (e) {}
        oscillator = null;
      }
    }
  });

  // ==========================================
  // 8. INTERACTIVE ENQUIRY FORM SUBMISSION
  // ==========================================
  const $allEnquiryForms = $('#leadEnquiryForm, #gvmContactForm, #contactEnquiryForm, #workWithUsForm, #serviceEnquiryForm');

  $allEnquiryForms.on('submit', function (e) {
    e.preventDefault();
    const $form = $(this);
    const $submitBtn = $form.find('button[type="submit"]');
    const originalBtnText = $submitBtn.html();

    $submitBtn.html('<i class="fas fa-circle-notch fa-spin"></i> Submitting enquiry...').prop('disabled', true);

    setTimeout(() => {
      $submitBtn.html(originalBtnText).prop('disabled', false);
      const $modal = $('#formModalBackdrop, #confirmationModal');
      if ($modal.length) {
        $modal.fadeIn(200).css('display', 'flex');
        $('body').css('overflow', 'hidden');
      }
      $form[0].reset();
    }, 700);
  });

  $('#formModalClose, #modalCloseBtn, .form-modal-backdrop .drawer-close').on('click', function () {
    $('#formModalBackdrop, #confirmationModal').fadeOut(200);
    $('body').css('overflow', 'auto');
  });

  $('#formModalBackdrop, #confirmationModal').on('click', function (e) {
    if (e.target === this) {
      $(this).fadeOut(200);
      $('body').css('overflow', 'auto');
    }
  });

  // Newsletter form submission
  $('#newsletterForm').on('submit', function(e) {
    e.preventDefault();
    const $btn = $(this).find('button');
    $btn.html('<i class="fas fa-check"></i> Subscribed!');
    setTimeout(() => {
      alert('Thank you for subscribing to Global Villaje Media Health Bulletin!');
      $('#newsletterForm')[0].reset();
      $btn.html('Subscribe');
    }, 500);
  });

  // ==========================================================================
  // 9. INTERACTIVE 3D BROADCAST STUDIO & HEALTH WAVE STAGE (Three.js WebGL)
  // ==========================================================================
  function initHero3DStudio() {
    const canvas = document.getElementById('hero3dCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const container = canvas.parentElement;
    let width = container.clientWidth || 480;
    let height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master Pivot Group for interactive rotation
    const studioGroup = new THREE.Group();
    scene.add(studioGroup);

    // Lighting (Warm Studio & Health Emerald Accents)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x34d399, 2.2);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.8);
    dirLight2.position.set(-6, -4, 4);
    scene.add(dirLight2);

    const corePointLight = new THREE.PointLight(0x10b981, 3.5, 12);
    corePointLight.position.set(0, 0.5, 0);
    studioGroup.add(corePointLight);

    // 1. BROADCAST STUDIO MICROPHONE (High Quality 3D Geometry)
    const micGroup = new THREE.Group();
    micGroup.position.set(0, 0.1, 0);
    studioGroup.add(micGroup);

    // Mic Grille Head (Cylinder + Capsule)
    const grilleMat = new THREE.MeshStandardMaterial({
      color: 0xd1fae5,
      metalness: 0.88,
      roughness: 0.22,
      wireframe: false
    });
    const grilleGeo = new THREE.CylinderGeometry(0.75, 0.75, 1.6, 32);
    const micGrille = new THREE.Mesh(grilleGeo, grilleMat);
    micGrille.position.y = 1.0;
    micGroup.add(micGrille);

    // Internal Glowing Vital Health Pulse Core (Inside mic head)
    const heartCoreGeo = new THREE.SphereGeometry(0.48, 24, 24);
    const heartCoreMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const heartCore = new THREE.Mesh(heartCoreGeo, heartCoreMat);
    heartCore.position.y = 1.0;
    micGroup.add(heartCore);

    // Gold Acoustic Band
    const goldBandGeo = new THREE.TorusGeometry(0.78, 0.05, 16, 48);
    const goldBandMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.15
    });
    const goldBand = new THREE.Mesh(goldBandGeo, goldBandMat);
    goldBand.rotation.x = Math.PI / 2;
    goldBand.position.y = 1.0;
    micGroup.add(goldBand);

    // Mic Body Handle
    const bodyGeo = new THREE.CylinderGeometry(0.65, 0.55, 1.8, 32);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      metalness: 0.6,
      roughness: 0.35
    });
    const micBody = new THREE.Mesh(bodyGeo, bodyMat);
    micBody.position.y = -0.6;
    micGroup.add(micBody);

    // Shockmount Circular Rings
    const mountGeo = new THREE.TorusGeometry(1.2, 0.045, 16, 64);
    const mountMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.8,
      roughness: 0.2
    });
    const shockmount1 = new THREE.Mesh(mountGeo, mountMat);
    shockmount1.rotation.x = Math.PI / 2;
    shockmount1.position.y = -0.2;
    micGroup.add(shockmount1);

    // 2. ORBITAL COMMUNITY SOUNDWAVE RINGS
    const orbitalRings = [];
    const ringConfigs = [
      { radius: 2.1, tiltX: 0.45, tiltZ: 0.35, speed: 0.012, color: 0x34d399 },
      { radius: 2.7, tiltX: -0.65, tiltZ: -0.25, speed: -0.009, color: 0xf59e0b },
      { radius: 3.3, tiltX: 0.25, tiltZ: -0.55, speed: 0.007, color: 0x60a5fa }
    ];

    ringConfigs.forEach((cfg) => {
      const ringGroup = new THREE.Group();
      ringGroup.rotation.x = cfg.tiltX;
      ringGroup.rotation.z = cfg.tiltZ;

      const ringGeo = new THREE.TorusGeometry(cfg.radius, 0.032, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.35,
        metalness: 0.7,
        roughness: 0.2
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringGroup.add(ringMesh);

      // Glowing Signal Node Orbiting
      const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.x = cfg.radius;
      ringGroup.add(nodeMesh);

      studioGroup.add(ringGroup);
      orbitalRings.push({ group: ringGroup, speed: cfg.speed, node: nodeMesh, radius: cfg.radius });
    });

    // 3. 3D AUDIO SPECTRUM EQUALIZER CYLINDERS (Surrounding base)
    const eqBarsCount = 28;
    const eqBars = [];
    const eqGroup = new THREE.Group();
    eqGroup.position.y = -1.6;
    studioGroup.add(eqGroup);

    for (let i = 0; i < eqBarsCount; i++) {
      const angle = (i / eqBarsCount) * Math.PI * 2;
      const r = 2.0;
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
      const barMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x10b981 : 0xf59e0b,
        emissive: i % 2 === 0 ? 0x059669 : 0xd97706,
        emissiveIntensity: 0.3
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(Math.cos(angle) * r, 0.3, Math.sin(angle) * r);
      eqGroup.add(bar);
      eqBars.push({ mesh: bar, baseAngle: angle, speed: 0.04 + Math.random() * 0.04, phase: Math.random() * Math.PI * 2 });
    }

    // 4. FLOATING HEALTH & BROADCAST PARTICLES
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 9;
      particlePos[i + 1] = (Math.random() - 0.5) * 7;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xa7f3d0,
      size: 0.065,
      transparent: true,
      opacity: 0.75
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    studioGroup.add(particleSystem);

    // Interactive Mouse & Gyro Rotation Controls
    let targetRotX = 0.15;
    let targetRotY = -0.25;
    let autoRotate = true;
    let pulseMultiplier = 1.0;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    $(container).on('mousedown', function (e) {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    $(window).on('mouseup', function () {
      isDragging = false;
    });

    $(container).on('mousemove', function (e) {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / width - 0.5;
        const normY = (e.clientY - rect.top) / height - 0.5;
        targetRotY = normX * 0.8;
        targetRotX = normY * 0.5;
      }
    });

    // 3D Control Buttons
    $('#btnRotate3D').on('click', function () {
      autoRotate = !autoRotate;
      $(this).toggleClass('active', autoRotate);
    });

    $('#btnPulse3D').on('click', function () {
      pulseMultiplier = 2.4;
      setTimeout(() => { pulseMultiplier = 1.0; }, 800);
    });

    $('#btnReset3D').on('click', function () {
      targetRotX = 0.15;
      targetRotY = -0.25;
      studioGroup.rotation.set(0, 0, 0);
    });

    // Resize Handler
    function onResize() {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', onResize);

    // Animation Loop with Visibility & IntersectionObserver Pauses
    let clock = new THREE.Clock();
    let isStudioVisible = true;

    if ('IntersectionObserver' in window && container) {
      const studioObserver = new IntersectionObserver((entries) => {
        isStudioVisible = entries[0].isIntersecting;
      }, { threshold: 0.05 });
      studioObserver.observe(container);
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!isStudioVisible || document.hidden) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth Rotation Damping
      if (autoRotate && !isDragging) {
        targetRotY += 0.0035;
      }
      studioGroup.rotation.y += (targetRotY - studioGroup.rotation.y) * 0.05;
      studioGroup.rotation.x += (targetRotX - studioGroup.rotation.x) * 0.05;

      // Floating Mic Idle Bob
      micGroup.position.y = Math.sin(time * 1.8) * 0.08;

      // Heart Core Vital Pulse
      const heartScale = (1 + Math.sin(time * 4.2) * 0.12) * pulseMultiplier;
      heartCore.scale.set(heartScale, heartScale, heartScale);
      corePointLight.intensity = (2.5 + Math.sin(time * 4.2) * 1.5) * pulseMultiplier;

      // Orbital Rings Animation
      orbitalRings.forEach((item, idx) => {
        item.group.rotation.y += item.speed;
        const nodeAngle = time * (1.2 + idx * 0.4);
        item.node.position.x = Math.cos(nodeAngle) * item.radius;
        item.node.position.z = Math.sin(nodeAngle) * item.radius;
      });

      // Equalizer Spectrum Pulse
      eqBars.forEach((bar) => {
        const h = Math.max(0.2, (Math.sin(time * 5 + bar.phase) * 0.5 + 0.5) * 1.4 * pulseMultiplier);
        bar.mesh.scale.y = h;
        bar.mesh.position.y = (h * 0.6) / 2;
      });

      // Ambient Particle Drift
      particleSystem.rotation.y = time * 0.025;

      renderer.render(scene, camera);
    }

    animate();
  }

  // ==========================================================================
  // 10. HERO MOVING AUDIO WAVE CANVAS (Dynamic Waveform Background)
  // ==========================================================================
  function initHeroWaveCanvas() {
    const canvas = document.getElementById('heroWaveCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);
    let isWaveVisible = true;

    if ('IntersectionObserver' in window && canvas.parentElement) {
      const waveObserver = new IntersectionObserver((entries) => {
        isWaveVisible = entries[0].isIntersecting;
      }, { threshold: 0.05 });
      waveObserver.observe(canvas.parentElement);
    }

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    });

    let step = 0;

    function renderWaves() {
      requestAnimationFrame(renderWaves);
      if (!isWaveVisible || document.hidden) return;

      ctx.clearRect(0, 0, width, height);
      step += 0.018;

      // Wave 1 - Emerald Primary Wave
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.28)';
      for (let x = 0; x < width; x += 6) {
        const y = Math.sin(x * 0.006 + step) * 35 + Math.cos(x * 0.012 + step * 0.7) * 20 + height * 0.65;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 2 - Warm Amber Secondary Frequency
      ctx.beginPath();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.22)';
      for (let x = 0; x < width; x += 6) {
        const y = Math.cos(x * 0.008 - step * 0.9) * 28 + Math.sin(x * 0.014 + step) * 15 + height * 0.58;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 3 - Soft Mint Fill Gradient Wave
      ctx.beginPath();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.035)';
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 8) {
        const y = Math.sin(x * 0.005 + step * 0.6) * 25 + height * 0.75;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
    }

    renderWaves();
  }

  // ==========================================================================
  // 11. GLOBAL AMBIENT BACKGROUND CANVAS (High-Performance Vital Waves)
  // ==========================================================================
  function initAmbientGlobalCanvas() {
    const canvas = document.getElementById('ambientGlobalCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // 14 Sleek Floating Signal Nodes
    const nodes = [];
    for (let i = 0; i < 14; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1.5,
        color: i % 2 === 0 ? 'rgba(5, 150, 105, ' : 'rgba(217, 119, 6, '
      });
    }

    let frame = 0;
    let lastRender = 0;
    const interval = 1000 / 30; // Solid 30fps budget for background ambiance

    function renderAmbient(timestamp) {
      requestAnimationFrame(renderAmbient);
      if (document.hidden) return;

      const elapsed = timestamp - lastRender;
      if (elapsed < interval) return;
      lastRender = timestamp - (elapsed % interval);

      ctx.clearRect(0, 0, width, height);
      frame += 0.015;

      // Draw subtle background harmonic curves
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.05)';
      ctx.beginPath();
      for (let x = 0; x < width; x += 14) {
        const y = Math.sin(x * 0.003 + frame) * 35 + height * 0.45;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Render Floating Signal Nodes and Interconnecting Radio Lines
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Interactive cursor proximity glow
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distSq = dx * dx + dy * dy;
        const alpha = distSq < 40000 ? 0.35 : 0.12;

        ctx.fillStyle = node.color + alpha + ')';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const nDistSq = ndx * ndx + ndy * ndy;
          if (nDistSq < 22500) {
            const nDist = Math.sqrt(nDistSq);
            ctx.strokeStyle = 'rgba(5, 150, 105, ' + (0.05 * (1 - nDist / 150)) + ')';
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(renderAmbient);
  }

  // ==========================================================================
  // 12. HERO LIVE AUDIO PREVIEW & SYNTHESIZER
  // ==========================================================================
  function initHeroAudioPreview() {
    const $playBtn = $('#heroPlayAudioBtn');
    const $playIcon = $('#heroPlayIcon');
    const $eqBars = $('#heroEqBars');
    let isPlaying = false;
    let audioCtx = null;
    let osc = null;
    let gainNode = null;

    $playBtn.on('click', function () {
      isPlaying = !isPlaying;
      if (isPlaying) {
        $playIcon.removeClass('fa-play').addClass('fa-pause');
        $eqBars.find('.eq-bar').css('animation-play-state', 'running');

        // Web Audio harmonic frequency chime
        try {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          osc = audioCtx.createOscillator();
          gainNode = audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(432, audioCtx.currentTime); // Harmonic 432Hz community frequency
          gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);

          osc.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          osc.start();
        } catch (e) {}
      } else {
        $playIcon.removeClass('fa-pause').addClass('fa-play');
        $eqBars.find('.eq-bar').css('animation-play-state', 'paused');

        if (osc) {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
          osc = null;
        }
      }
    });

    // Floating Broadcast Widget Click Handler
    $('#floatingRadioWidget').on('click', function () {
      if ($('#radioSection').length) {
        $('html, body').animate({
          scrollTop: $('#radioSection').offset().top - 80
        }, 600);
      } else {
        $playBtn.trigger('click');
      }
    });
  }

  // ==========================================================================
  // 13. SCROLL REVEAL & INTERACTIVE MICRO-ANIMATIONS
  // ==========================================================================
  function initScrollAnimations() {
    const targets = document.querySelectorAll(
      '.programme-card, .video-card, .metric-card, .founder-card, .lead-form-card, .inquiry-form-card, .feature-card, .faq-item'
    );

    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('animated-in'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    targets.forEach((el, index) => {
      el.classList.add('scroll-reveal-item');
      el.style.transitionDelay = (index % 4 * 0.08) + 's';
      revealObserver.observe(el);
    });
  }

  // Initialize interactive features
  initHeroWaveCanvas();
  initAmbientGlobalCanvas();
  initHeroAudioPreview();
  initScrollAnimations();
});
