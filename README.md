# Ravilla Ruthvik — Professional Portfolio Website

Personal portfolio website for **Ravilla Ruthvik**, Computer Science and Engineering student at Mohan Babu University (Graduation: 2027), targeting **Cybersecurity Analyst** and **Full-Stack Developer** roles.

Built with **clean semantic HTML5, modern CSS3, and vanilla JavaScript** without heavy frameworks, runtimes, or external build dependencies.

---

## 🛡️ Website Overview

- **Design Philosophy**: High-contrast, dark cybersecurity aesthetic (`#090B10`, `#10131B`, `#141925`) with restrained neon accents (`#B7F36B` green, `#83E6DC` cyan), clean typography, monospace technical accents, and zero visual clutter.
- **Key Sections**:
  1. **Navigation**: Responsive navbar with RR monogram, smooth anchor links, active section highlighter, and keyboard-accessible mobile menu drawer.
  2. **Hero**: Headline, dynamic typewriter animation with zero layout shift, status pill ("B.Tech CSE '27 | Mohan Babu University"), primary CTAs, and dynamic profile portrait with graceful initials fallback.
  3. **About Me**: Academic background, career goals, and core security interests.
  4. **Technical Skills Dashboard**: Categorized into Programming (Java, Python), Web Foundations (HTML5, CSS3), Currently Learning (JavaScript, SQL, Vibe Coding), AI & Modern Workflows (Vibe Coding, AI-Assisted Prototyping, Prompt-Driven Dev), Planned Learning (React.js, Node.js, Express.js), and Cybersecurity Knowledge (Fundamentals, Network Security, Vulnerability Management, IAM, Security Policies).
  5. **Projects**:
     - *AI-Assisted Cyber Risk Assessment & Security Recommendation System* (Final-year project in progress, with locked architecture visual flowchart showing deterministic rule-based risk calculation and AI explanation layer).
     - *Vijaya Dairy Website* (Frontend web development project for a local business in Nellore).
     - *Personal Portfolio Website* (The current portfolio showcasing semantic architecture).
  6. **Interactive Security Architecture Inspector**: Safe, client-side visual component illustrating defensive security posture and risk calculation workflow without fake command execution.
  7. **Certifications**: 5 completed courses (IBM SkillsBuild with active Credly badge verification, and 4 LinkedIn Learning courses with local PDF detection).
  8. **Resume**: Clean status module indicating upcoming resume with single-file drop-in instructions.
  9. **Contact & Footer**: Direct email link, GitHub link, inactive LinkedIn placeholder, client-side validated contact form with RFC 6068 mailto generation and quick-copy email button.

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Opening (Zero Server Required)
Simply double-click `index.html` or open it directly in any modern browser (Chrome, Firefox, Safari, Edge):
```bash
# On Linux / macOS
open index.html
# On Windows
start index.html
```

### Option 2: Using the Development Server
If you have Node.js installed:
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
├── index.html            # Main semantic HTML structure
├── style.css             # Centrally configured design system & responsive CSS
├── script.js             # Vanilla JS: typewriter, mobile nav, copy button, form validation
├── favicon.svg           # Custom SVG cybersecurity shield monogram
├── README.md             # Project documentation
├── assets/
│   ├── images/
│   │   ├── README.md     # Instructions for adding profile.jpg
│   │   └── profile.jpg   # (Add your photo here)
│   ├── certificates/
│   │   ├── README.md     # Instructions for the 5 certificate PDFs
│   │   ├── IBM-Cybersecurity-Fundamentals.pdf
│   │   ├── Introduction-to-Identity-and-Access-Management.pdf
│   │   ├── Vulnerability-Management-in-Cybersecurity-The-Basics.pdf
│   │   ├── Cisco-Network-Security-Core-Security-Concepts.pdf
│   │   └── Cybersecurity-Key-Policies-and-Resources.pdf
│   └── Ravilla-Ruthvik-Resume.pdf # (Add your resume PDF here)
```

---

## ⚙️ Adding Your Files

1. **Profile Photograph**:
   - Place your picture at `assets/images/profile.jpg`.
   - The website automatically checks for this image and swaps out the initials monogram with your photo!
2. **Resume**:
   - Place your resume PDF at `assets/Ravilla-Ruthvik-Resume.pdf`.
   - In `index.html`, remove the `disabled` attribute from the resume download button.
3. **Certificates**:
   - Save your 5 certificate PDFs in `assets/certificates/` with the exact filenames listed above.
4. **LinkedIn Profile**:
   - In `index.html` under Section 8 (Contact) and Section 1 (Nav), update the LinkedIn link with your URL:
   ```html
   <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
   ```
