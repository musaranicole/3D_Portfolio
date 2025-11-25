{/* Social Media Icons */}
<div style={{ 
  display: 'flex', 
  gap: '25px', 
  marginTop: '30px',
  alignItems: 'center'
}}>
  
  {/* LinkedIn */}
  <a 
    href="https://www.linkedin.com/in/nicole-musara-362a60288/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img 
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
      alt="LinkedIn"
      width="32"
      style={{
        filter: "invert(1)",
        transition: "all 0.3s ease"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.filter = "invert(0) drop-shadow(0 0 10px #00d4ff)";
        e.currentTarget.style.transform = "scale(1.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.filter = "invert(1)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    />
  </a>

  {/* GitHub */}
  <a 
    href="https://github.com/musaranicole"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img 
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
      alt="GitHub"
      width="32"
      style={{
        filter: "invert(1)",
        transition: "all 0.3s ease"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.filter = "invert(0) drop-shadow(0 0 10px #00d4ff)";
        e.currentTarget.style.transform = "scale(1.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.filter = "invert(1)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    />
  </a>

  {/* Kaggle */}
  <a 
    href="https://www.kaggle.com/nicolemusara"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img 
      src="https://cdn.jsdelivr.net/npm/simple-icons@v6/icons/kaggle.svg"
      alt="Kaggle"
      width="32"
      style={{
        filter: "invert(1)",
        transition: "all 0.3s ease"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.filter = "invert(0) drop-shadow(0 0 10px #00d4ff)";
        e.currentTarget.style.transform = "scale(1.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.filter = "invert(1)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    />
  </a>

  {/* Email */}
  <a 
    href="mailto:nicolemusara30@gmail.com"
  >
    <img 
      src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg"
      alt="Email"
      width="32"
      style={{
        filter: "invert(1)",
        transition: "all 0.3s ease"
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.filter = "invert(0) drop-shadow(0 0 10px #00d4ff)";
        e.currentTarget.style.transform = "scale(1.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.filter = "invert(1)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    />
  </a>

</div>
