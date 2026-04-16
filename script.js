document.addEventListener('DOMContentLoaded', () => {

  // ---------- 0. AUDIO ENGINE (REMOVED) ---------- //
  // The AudioEngine has been intentionally removed as requested.
  const audio = {
    setThruster: () => {},
    playBlip: () => {},
    playClick: () => {}
  };

  // ---------- 1. LENIS SMOOTH SCROLL ---------- //
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time)=>{ lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // ---------- 2. CUSTOM SPLIT-TEXT LOGIC (REVERSED TO KINETIC) ---------- //
  function splitTextToChars(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      const text = el.innerText;
      const words = text.split(' ');
      el.innerHTML = '';
      words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        word.split('').forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.className = 'char';
          charSpan.innerText = char;
          wordDiv.appendChild(charSpan);
        });
        el.appendChild(wordDiv);
        el.append(' ');
      });
    });
  }
  
  splitTextToChars('.kinetic-text');
  splitTextToChars('.kinetic-text-sub');
  splitTextToChars('.kinetic-text-small');

  // ---------- 3. BRUTALIST LOADER ---------- //
  const loaderCounter = document.querySelector('.loader-counter');
  const loaderProgress = document.querySelector('.loader-progress');
  let count = 0;
  
  const updateLoader = setInterval(() => {
    count += Math.floor(Math.random() * 12) + 1;
    if (count >= 100) {
      count = 100;
      clearInterval(updateLoader);
      loaderCounter.innerText = "100";
      loaderProgress.style.width = "100%";
      playHeroSequence();
    } else {
      loaderCounter.innerText = String(count).padStart(3, '0');
      loaderProgress.style.width = count + "%";
    }
  }, 30);

  function playHeroSequence() {
    const tl = gsap.timeline();
    tl.to(".loader-wrapper", {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        document.body.classList.remove('loading');
      }
    })
    .from(".gsap-nav", { y: -50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.2")
    .from(".gsap-hero-f", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.8")
    
    // Original Kinetic typography burst physics 
    .from(".kinetic-text .char", {
      y: 100,
      skewY: 10,
      opacity: 0,
      stagger: 0.02,
      duration: 1,
      ease: "back.out(1.5)"
    }, "-=0.5")
    .from(".kinetic-text-sub .char", {
      y: 50,
      opacity: 0,
      stagger: 0.01,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.6");
  }

  // ---------- 4. SCROLL ANIMATIONS ENHANCED ---------- //
  
  gsap.utils.toArray('.gsap-fade').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 50, opacity: 0, duration: 1, ease: "power3.out"
    });
  });

  const kineticElements = document.querySelectorAll('.kinetic-text .char, .kinetic-text-small .char');
  kineticElements.forEach(char => {
    gsap.to(char, {
      scrollTrigger: {
        trigger: char,
        start: "top 90%",
        end: "bottom 10%",
        scrub: true
      },
      y: (Math.random() - 0.5) * 50, 
      rotationZ: (Math.random() - 0.5) * 10
    });
  });

  // ---------- 4.5 3D FLIGHT TUNNEL GSAP ---------- //
  // Removed Z-Axis Tunnel: Transitioned to Glassmorphic Grid Architecture

  // ---------- GLOBAL DECRYPT PROTOCOL ---------- //
  const decodeBtn = document.getElementById('global-decode-btn');
  const decodeTargets = document.querySelectorAll('[data-decode]');
  const decodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  if(decodeBtn) {
    decodeBtn.addEventListener('click', () => {
      // Self Destruct Button
      gsap.to(decodeBtn, { opacity: 0, scale: 0.9, y: 20, duration: 0.4, pointerEvents: "none", ease: "power2.in" });
      
      // Decrypt Sequence
      decodeTargets.forEach((el, index) => {
        setTimeout(() => {
          let iterations = 0;
          const targetText = el.dataset.human || el.innerText;
          
          const interval = setInterval(() => {
            el.innerText = targetText.split("").map((letter, i) => {
               if(i < iterations) {
                 return targetText[i];
               }
               if(letter === ' ' || letter === '\n') return letter;
               return decodeChars[Math.floor(Math.random() * decodeChars.length)];
            }).join("");
            
            if(iterations >= targetText.length) {
                clearInterval(interval);
                // Also trigger kinetic text rebuild if it's a kinetic element
                if(el.classList.contains('kinetic-text') || el.classList.contains('kinetic-text-sub') || el.classList.contains('kinetic-text-small')) {
                  // For now, it's fine as plain text since the user requested reading it.
                }
            }
            iterations += 1; // Instant Decrypt speed
          }, 15);
        }, index * 10); // Very fast staggering
      });
    });
  }

  // ---------- 5. EXPANSIVE PROJECT MODAL SYSTEM ---------- //
  // Removed Modal: Relying on full-fidelity inline horizontal image galleries inside Glassmorphic Grid.

  // ---------- 5.5 FULL-SCREEN MOBILE MENU ---------- //
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuBg = document.querySelector('.menu-bg');
  const menuLinksDiv = document.querySelector('.menu-links');
  const menuLinks = document.querySelectorAll('.menu-link');
  const menuToggleBtn = document.querySelector('.menu-toggle');
  const menuCloseBtn = document.querySelector('.menu-close');

  let isMenuOpen = false;
  const menuTl = gsap.timeline({ paused: true, reversed: true });

  menuTl.to(menuOverlay, { opacity: 1, duration: 0.1 })
        .to(menuOverlay, { pointerEvents: "auto", duration: 0 })
        .fromTo(menuBg, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.inOut" })
        .to(menuCloseBtn, { top: "2rem", right: "2rem", duration: 0.4, ease: "back.out(1.5)" }, "-=0.2")
        .to(menuLinks, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power4.out" }, "-=0.2");

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      document.body.classList.add('modal-open');
      lenis.stop();
      menuTl.play();
    } else {
      document.body.classList.remove('modal-open');
      lenis.start();
      menuTl.reverse();
    }
  }

  menuToggleBtn.addEventListener('click', toggleMenu);
  menuCloseBtn.addEventListener('click', toggleMenu);
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(isMenuOpen) toggleMenu();
    });
  });

  // ---------- 6. CONTACT FORM INTERACTION ---------- //
  const contactForm = document.querySelector('.contact-form');
  const submitBtn = document.querySelector('.contact-form button');
  if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Transmitting Payload...</span> <i data-lucide="loader"></i>';
      lucide.createIcons();
      gsap.to(submitBtn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
      
      setTimeout(() => {
        submitBtn.innerHTML = '<span>Payload Transmitted</span> <i data-lucide="check"></i>';
        lucide.createIcons();
        submitBtn.style.background = "#0f0";
        submitBtn.style.color = "#000";
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = "";
          submitBtn.style.color = "";
          lucide.createIcons();
        }, 3000);
      }, 1500);
    });
  }



  // ---------- 7. MAGNETIC UX + CUSTOM CURSOR ---------- //
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');
  let magneticItems = document.querySelectorAll('[data-magnetic]');

  let mouseX = 0;
  let mouseY = 0;
  let rawMouseX = window.innerWidth / 2;
  let rawMouseY = window.innerHeight / 2;
  let targetX = 0;
  let targetY = 0;

  function initMagnetic() {
    if (!window.matchMedia("(pointer: fine)").matches) {
      cursorDot.style.display = 'none';
      cursorOutline.style.display = 'none';
      document.body.style.cursor = 'auto'; 
      return;
    }

    window.addEventListener('mousemove', (e) => {
      rawMouseX = e.clientX;
      rawMouseY = e.clientY;
      mouseX = (rawMouseX - window.innerWidth / 2);
      mouseY = (rawMouseY - window.innerHeight / 2);

      cursorDot.style.left = `${rawMouseX}px`;
      cursorDot.style.top = `${rawMouseY}px`;

      cursorOutline.animate({
        left: `${rawMouseX}px`,
        top: `${rawMouseY}px`
      }, { duration: 500, fill: "forwards", easing: "cubic-bezier(0.19, 1, 0.22, 1)" });
    });

    // Pointer Click Visuals
    window.addEventListener('mousedown', () => {
      gsap.to(cursorOutline, { scale: 0.5, duration: 0.15, ease: "power2.inOut", background: "rgba(255,255,255,0.2)" });
      gsap.to(cursorDot, { scale: 1.5, duration: 0.15, ease: "power2.inOut" });
    });
    window.addEventListener('mouseup', () => {
      gsap.to(cursorOutline, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)", background: "transparent" });
      gsap.to(cursorDot, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
    });

    // Pointer Hover Visuals for all buttons
    const interactiveElements = document.querySelectorAll('button, a, .skill-key');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorOutline, { scale: 1.5, borderColor: "rgba(255,255,255,0.8)", duration: 0.3, ease: "power2.out" });
        gsap.to(cursorDot, { scale: 1.8, rotation: 180, duration: 0.3, ease: "back.out(1.7)" });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursorOutline, { scale: 1, borderColor: "var(--text-main)", duration: 0.3, ease: "power2.out" });
        gsap.to(cursorDot, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out" });
      });
    });
    
    // Project View Custom Cursor
    const projectCursor = document.querySelector('.project-view-cursor');
    const projectsSection = document.querySelector('.projects-grid');
    
    if(projectsSection && projectCursor) {
      projectsSection.addEventListener('mouseenter', () => {
        gsap.to(projectCursor, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" });
        cursorDot.style.opacity = 0;
        cursorOutline.style.opacity = 0;
      });
      projectsSection.addEventListener('mousemove', (e) => {
        gsap.to(projectCursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      });
      projectsSection.addEventListener('mouseleave', () => {
        gsap.to(projectCursor, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
        cursorDot.style.opacity = 1;
        cursorOutline.style.opacity = 1;
      });
    }
  }

  initMagnetic();


  // ---------- 7. THREE.JS 3D WEB BACKGROUND (WITH MOUSE REPULSION) ---------- //
  
  const skills = [
    "3D Web", "Android UI", "Anime.js", "Agent Memory", "Agent Orchestration", 
    "API Design", "Architecture", "AWS Serverless", "Backend Arch", 
    "Brainstorming", "C4 Container", "C4 Context", "Cloud Architect", 
    "Code Review", "Concise Planning", "Deployment", "Docker Expert", 
    "Frontend Design", "LangGraph", "Lint & Validate", "LLM Apps", 
    "Microservices", "Multi-Agent System", "Next.js", "Pentesting", 
    "Plan Writing", "Prompt Engineering", "RAG Engineer", "React Patterns", 
    "Security Analyst", "UI Design"
  ];
  const skillsContainer = document.getElementById('skillsContainer');
  skills.forEach(skill => {
    const skillEl = document.createElement('div');
    skillEl.classList.add('skill-key');
    skillEl.setAttribute('data-magnetic', '');
    skillEl.textContent = skill;
    skillsContainer.appendChild(skillEl);
  });
  
  // Re-init magnetic to bind dynamic skills
  initMagnetic();

  const canvas = document.getElementById('bg-canvas');
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.0012);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 1000;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const group = new THREE.Group();
  scene.add(group);

  // Load the downloaded spaceship GLB from assets
  let spaceshipModel = null;
  const gltfLoader = new THREE.GLTFLoader();
  gltfLoader.load('assets/spaceship_colaid1_50k.glb', (gltf) => {
    spaceshipModel = gltf.scene;

    // Use Box3 to automatically scale the model to a reasonable size
    const box = new THREE.Box3().setFromObject(spaceshipModel);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // We want the ship to be roughly 150 units wide/long
    const targetSize = 150;
    const scaleFactor = targetSize / maxDim;
    spaceshipModel.scale.set(scaleFactor, scaleFactor, scaleFactor);
    
    // Position it appropriately in front of the camera
    spaceshipModel.position.set(0, -20, 750); // Pushed further away from camera (Z=1000)
    
    // Base rotations - aligned perfectly flat and showing rear engines as requested
    spaceshipModel.rotation.y = 0; 
    spaceshipModel.rotation.x = 0; 

    // Apply basic material styling if needed, or leave original textures
    spaceshipModel.traverse((child) => {
      // We keep the original textured colors of your beautiful spaceship!
      // The backdrop-filter on the buttons will ensure legibility against it.
    });

    // Clean, natural lighting for the original textures
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(200, 500, 300);
    scene.add(dirLight);

    group.add(spaceshipModel);
  });

  // Mobile Performance Scaling
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 150 : 450; 
  const geometry = new THREE.BufferGeometry();
  
  const basePositions = new Float32Array(particleCount * 3);
  const currentPositions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  const range = 900;

  for (let i = 0; i < particleCount; i++) {
    const r = range * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    basePositions[i*3] = x;
    basePositions[i*3+1] = y;
    basePositions[i*3+2] = z;

    currentPositions[i*3] = x;
    currentPositions[i*3+1] = y;
    currentPositions[i*3+2] = z;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

  const pMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2.5,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(geometry, pMaterial);
  group.add(particles);

  // Hyper-speed Warp Field
  const warpCount = isMobile ? 300 : 800;
  const warpGeo = new THREE.BufferGeometry();
  const warpPos = new Float32Array(warpCount * 3);
  for(let i=0; i<warpCount; i++) {
    warpPos[i*3] = (Math.random() - 0.5) * 3500;
    warpPos[i*3+1] = (Math.random() - 0.5) * 3500;
    warpPos[i*3+2] = Math.random() * -3000;
  }
  warpGeo.setAttribute('position', new THREE.BufferAttribute(warpPos, 3));
  const warpMat = new THREE.PointsMaterial({
    color: 0xcccccc,
    size: 3,
    transparent: true,
    opacity: 0.9
  });
  const warpStars = new THREE.Points(warpGeo, warpMat);
  scene.add(warpStars);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1
  });

  let scrollVelocity = 0;
  lenis.on('scroll', (e) => { 
    scrollVelocity = e.velocity; 
  });

  window.isOrbitMode = false;
  window.projectNodes = []; // Will hold the 3D meshes for projects

  function animate() {
    requestAnimationFrame(animate);
    
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Engine Thruster sound based on scroll speed
    let speedNorm = Math.min(Math.abs(scrollVelocity) / 50, 1);
    audio.setThruster(window.isOrbitMode ? 0.8 : speedNorm); // Always thrusting in orbit

    // React to Scroll
    if (!window.isOrbitMode) {
      group.rotation.x += 0.05 * (targetY - group.rotation.x) + (scrollVelocity * 0.0005);
      group.rotation.y += 0.05 * (targetX - group.rotation.y) + (scrollVelocity * 0.0005);
      // Constant orbit
      group.rotation.y += 0.001;
      group.rotation.z += 0.0005;
    } else {
      // Freeze the galactic background smoothly into a steady forward-facing grid!
      group.rotation.x += (0 - group.rotation.x) * 0.05;
      group.rotation.y += (0 - group.rotation.y) * 0.05;
      group.rotation.z += (0 - group.rotation.z) * 0.05;
    }

    // Bank the spaceship model slightly with mouse
    if(spaceshipModel) {
       if (!window.isOrbitMode) {
         spaceshipModel.rotation.z = -targetX * 0.5;
         spaceshipModel.rotation.x = -(targetY * 0.5);
         spaceshipModel.position.z = 750 + (Math.abs(scrollVelocity) * 0.8);
       } else {
         // In orbit mode, tilted down to perfectly showcase the rear/top chassis (Arcade POV)
         spaceshipModel.rotation.z -= spaceshipModel.rotation.z * 0.1;
         spaceshipModel.rotation.x += (0.25 - spaceshipModel.rotation.x) * 0.1;
       }
       const time = Date.now() * 0.001;
       if(!window.isOrbitMode) {
           spaceshipModel.position.y = -20 + Math.sin(time * 2) * 5; 
           spaceshipModel.rotation.z += Math.sin(time * 4) * 0.02; 
           spaceshipModel.position.x = Math.cos(time * 1.5) * 3;
           spaceshipModel.rotation.y += (0 - spaceshipModel.rotation.y) * 0.1;
       } else {
           // Locked rigidly to the center viewport with an energetic up/down pulse bob
           spaceshipModel.position.x += (0 - spaceshipModel.position.x) * 0.1;
           const targetY = -25 + Math.sin(time * 3) * 1.5;
           spaceshipModel.position.y += (targetY - spaceshipModel.position.y) * 0.1;
           // Face the rear to the camera for an authentic space-fighter POV!
           spaceshipModel.rotation.y += (Math.PI - spaceshipModel.rotation.y) * 0.1;
       }

       // --- HYPER-STREAM WARP TUNNEL ---
       if (window.isOrbitMode && window.projectNodes) {
          window.projectNodes.forEach((node, i) => {
             let isHovered = (node.material.opacity === 1.0);
             let speed = isHovered ? 0 : 3 + (i % 2); // Significantly slowed down varying speeds
             
             if (!isHovered) {
                 // Move forward at high speed
                 node.position.z += speed;
                 
                 // Elegant bobbing
                 node.position.y += Math.sin(Date.now() * 0.002 + i) * 0.2;
                 
                 // If passed camera, respawn deep in the warp tunnel
                 if (node.position.z > camera.position.z + 100) {
                     node.position.z = camera.position.z - 5000;
                     // Randomize position subtly on respawn
                     const isLeft = Math.random() > 0.5;
                     node.position.x = isLeft ? (-160 - Math.random() * 40) : (160 + Math.random() * 40);
                     node.position.y = (Math.random() - 0.5) * 80;
                     node.rotation.y = isLeft ? 0.2 : -0.2;
                     node.userData.baseRotY = node.rotation.y;
                 }
                 
                 // Aerodynamic forward-facing angle
                 node.rotation.set(0, node.userData.baseRotY || 0, 0);
                 
                 // Slowly bank into the tunnel based on distance
                 node.rotation.z = Math.sin(node.position.z * 0.001) * -0.05;
             } else {
                 // Magnetic Inspection Hover - Lock front and center!
                 const targetZ = camera.position.z - 160;
                 const targetY = camera.position.y;
                 const targetX = camera.position.x;
                 
                 node.position.x += (targetX - node.position.x) * 0.15;
                 node.position.y += (targetY - node.position.y) * 0.15;
                 node.position.z += (targetZ - node.position.z) * 0.15;
                 
                 node.quaternion.slerp(camera.quaternion, 0.2);
             }
          });
       }
    }

    if (!window.isOrbitMode) {
      camera.position.z = 1000 + (Math.abs(scrollVelocity) * 3); 
    }

    // --- Mouse Repulsion Physics ---
    const vector = new THREE.Vector3(
      (rawMouseX / window.innerWidth) * 2 - 1,
      -(rawMouseY / window.innerHeight) * 2 + 1,
      0.5
    );
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = (0 - camera.position.z) / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    group.worldToLocal(pos);

    const positionsAttribute = geometry.attributes.position;
    
    for (let i = 0; i < particleCount; i++) {
        const px = currentPositions[i*3];
        const py = currentPositions[i*3+1];
        const pz = currentPositions[i*3+2];
        
        const bx = basePositions[i*3];
        const by = basePositions[i*3+1];
        const bz = basePositions[i*3+2];

        // Calc distance from mouse
        const dx = px - pos.x;
        const dy = py - pos.y;
        const dz = pz - pos.z;
        const distToMouse = Math.sqrt(dx*dx + dy*dy + dz*dz);
        
        // Repulsion force
        const maxDist = 200;
        if(distToMouse < maxDist) {
            const force = (maxDist - distToMouse) / maxDist;
            velocities[i*3] += (dx / distToMouse) * force * 2;
            velocities[i*3+1] += (dy / distToMouse) * force * 2;
            velocities[i*3+2] += (dz / distToMouse) * force * 2;
        }

        // Spring back to base position
        velocities[i*3] += (bx - px) * 0.02;
        velocities[i*3+1] += (by - py) * 0.02;
        velocities[i*3+2] += (bz - pz) * 0.02;

        // Apply friction
        velocities[i*3] *= 0.9;
        velocities[i*3+1] *= 0.9;
        velocities[i*3+2] *= 0.9;

        // Apply velocity
        currentPositions[i*3] += velocities[i*3];
        currentPositions[i*3+1] += velocities[i*3+1];
        currentPositions[i*3+2] += velocities[i*3+2];
    }
    
    positionsAttribute.needsUpdate = true;
    
    // Process warp stars
    const wAttr = warpGeo.attributes.position;
    const baseWarpSpeed = window.systemInArchive ? 40 : 3;
    const scrollWarpMult = window.systemInArchive ? 0 : Math.abs(scrollVelocity) * 0.1;
    
    for(let i=0; i<warpCount; i++) {
       let speed = baseWarpSpeed + scrollWarpMult;
       wAttr.array[i*3+2] += speed;
       // If star passes camera, reset far back
       if(wAttr.array[i*3+2] > camera.position.z + 100) {
          wAttr.array[i*3+2] = camera.position.z - 3000;
       }
    }
    wAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---------- 7.5 ORBITAL SHOWCASE LOGIC ---------- //
  const raycaster = new THREE.Raycaster();
  const mouseVec = new THREE.Vector2();

  const hudOverlay = document.getElementById('project-hud');
  const hudCloseBtn = document.getElementById('close-hud-btn');
  const hudExitBtn = document.getElementById('exit-orbit-btn');
  const launchBtn = document.getElementById('launch-showcase-btn');

  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      lenis.stop(); // Stop scroll
      document.body.style.overflow = 'hidden';
      // Fade out the surrounding text
      gsap.to('.projects .skills-intro, .launch-container', { opacity: 0, duration: 1, pointerEvents: 'none' });
      // Show Exit button
      if (hudExitBtn) gsap.to(hudExitBtn, { opacity: 1, pointerEvents: 'auto', duration: 1, delay: 0.5 });
      
      window.isOrbitMode = true;
      if(spaceshipModel) {
          // Dive the camera deeply, zooming the plane closer exactly as requested (adjusted down slightly)
          gsap.to(camera.position, { z: 350, y: -10, duration: 2.5, ease: "power3.inOut" });
          gsap.to(spaceshipModel.position, { z: 180, duration: 2.5, ease: "power3.inOut" });
      }

      // Fade in the project arrays only once orbital mode has explicitly launched
      window.projectNodes.forEach(node => {
         gsap.to(node.material, { opacity: node.userData.baseOpacity, duration: 1, delay: 0.5 });
      });
    });
  }

  // Global `window.PROJECT_DATA` is inherited from index.html which contains the full project configurations.
  // This ensures a centralized single source of truth for the orbital nodes.
  
  function initOrbitNodes() {
    window.projectNodes = [];
    if (!window.PROJECT_DATA) return;
    const projectKeys = Object.keys(window.PROJECT_DATA);
    
    // Virtual expansion: Endless stream of data cores
    let displayKeys = [];
    while(displayKeys.length < 14) {
       displayKeys = displayKeys.concat(projectKeys);
    }
    
    displayKeys.forEach((key, index) => {
       const data = window.PROJECT_DATA[key];
       let texture = null;
       if (data.images && data.images[0]) {
           const loader = new THREE.TextureLoader();
           loader.setCrossOrigin('anonymous');
           texture = loader.load(data.images[0]);
       }
       
       // Sleek flat holographic rectangular data slabs
       const boxGeo = new THREE.PlaneGeometry(130, 75); 
       
       const material = new THREE.MeshBasicMaterial({
          color: 0x88dddd, 
          map: texture,
          transparent: true,
          opacity: 0 
       });
       
       const mesh = new THREE.Mesh(boxGeo, material);
       
       // High-end glowing cyber wireframe outline
       const edges = new THREE.EdgesGeometry(boxGeo);
       const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0 });
       const line = new THREE.LineSegments(edges, edgeMaterial);
       mesh.add(line);
       
       mesh.userData.edgeLine = line;
       mesh.userData.id = key;
       mesh.userData.baseOpacity = 0.6; // Slightly more visible for warp effect
       
       const isLeft = index % 2 === 0;
       const spreadX = 160 + Math.random() * 40;
       mesh.position.x = isLeft ? -spreadX : spreadX;
       mesh.position.y = (Math.random() - 0.5) * 80;
       mesh.position.z = -1000 - (index * 400);
       
       mesh.rotation.y = isLeft ? 0.2 : -0.2;
       mesh.userData.baseRotY = mesh.rotation.y;
       
       // Removed errant position.set
       window.projectNodes.push(mesh);
       group.add(mesh);
    });
  }
  
  initOrbitNodes();

  // (ScrollTrigger for orbit mode has been completely unhooked. 
  // It now relies absolutely on the 'Initiate Orbital Array' command.)

  // Handle Raycasting Hover
  window.addEventListener('mousemove', (e) => {
     mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
     mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;
     
     if (window.isOrbitMode) {
        raycaster.setFromCamera(mouseVec, camera);
        const intersects = raycaster.intersectObjects(window.projectNodes);
        
        // Smoothly fade back inactive projects
        window.projectNodes.forEach(n => {
           n.material.color.setHex(0x88dddd); // Premium baseline cyan
           n.material.opacity = n.userData.baseOpacity;
           if(n.userData.edgeLine) n.userData.edgeLine.material.opacity = 0.3; // subtle glow
        });
        
        if (intersects.length > 0) {
           const node = intersects[0].object;
           node.material.color.setHex(0xffffff); // Pop pure white on hover
           node.material.opacity = 1.0;
           if(node.userData.edgeLine) node.userData.edgeLine.material.opacity = 1.0; // intense glow!
        }
     }
  });
  
  // Handle Raycasting Click
  window.addEventListener('click', (e) => {
     const hudOverlay = document.getElementById('project-hud');
     if (window.isOrbitMode && hudOverlay && !hudOverlay.classList.contains('active')) {
        raycaster.setFromCamera(mouseVec, camera);
        const intersects = raycaster.intersectObjects(window.projectNodes);
        
        if (intersects.length > 0) {
           const projectId = intersects[0].object.userData.id;
           openHUD(projectId);
        }
     }
  });


  function openHUD(id) {
     const data = window.PROJECT_DATA[id];
     if(!data) return;
     audio.playBlip();
     
     document.getElementById('hud-title').innerText = data.title;
     document.getElementById('hud-link').innerText = data.link;
     document.getElementById('hud-deploy-btn').href = data.url;
     
     const tagsContainer = document.getElementById('hud-tags');
     tagsContainer.innerHTML = '';
     data.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.innerText = t;
        tagsContainer.appendChild(span);
     });
     
     const track = document.getElementById('hud-gallery-track');
     track.innerHTML = '';
     data.images.forEach(img => {
        const iel = document.createElement('img');
        iel.src = img;
        track.appendChild(iel);
     });
     
     hudOverlay.classList.add('active');
  }
  
  if(hudCloseBtn) {
     hudCloseBtn.addEventListener('click', () => {
        audio.playClick();
        hudOverlay.classList.remove('active');
     });
  }
  
  if(hudExitBtn) {
     hudExitBtn.addEventListener('click', () => {
        audio.playClick();
        hudOverlay.classList.remove('active');
        window.isOrbitMode = false;
        
        // Hide Exit Button
        gsap.to(hudExitBtn, { opacity: 0, pointerEvents: 'none', duration: 0.5 });
        
        // Restore UI
        gsap.to('.projects .skills-intro, .launch-container', { opacity: 1, duration: 1, pointerEvents: 'auto' });
        
        // Restore Orbit Nodes
        window.projectNodes.forEach(node => {
           gsap.to(node.material, { opacity: 0, duration: 1 });
        });
        
        // Camera snaps back via animate loop, but we animate it gently
        gsap.to(camera.position, { x: 0, y: 0, z: 1000, duration: 2, ease: "power3.inOut" });
        gsap.to(camera.rotation, { x: 0, duration: 2, ease: "power3.inOut" });
        
        if(spaceshipModel) {
            gsap.to(spaceshipModel.position, { z: 750, duration: 2, ease: "power3.inOut" });
            gsap.to(spaceshipModel.rotation, { x: 0.3, duration: 2, ease: "power3.inOut" });
        }
        
        lenis.start();
        document.body.style.overflow = 'auto';
     });
  }

});
