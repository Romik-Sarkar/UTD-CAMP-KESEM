# Camp Kesem UTD Website

Official website for Camp Kesem UTD, built with HTML, CSS, and JavaScript. This website is designed to be hosted on GitHub Pages for free.

## 📁 File Structure

```
kesem-utd-website/
├── index.html          # Main homepage
├── styles.css          # Styling 
├── navbar.html         # navigation component
├── footer.html         # footer component
├── images/             # Add all images
│   └── KesemLogo.png   
└── README.md           # This file
```

## 🎨 Brand Colors Used

The website uses official Kesem brand colors defined as CSS variables:

- **KESEM LAKE BLUE**: `#008FBE`
- **KESEM POOL AQUA**: `#00C08A`  
- **KESEM SUNSHINE YELLOW**: `#FFDB00`
- **KESEM SKY BLUE**: `#00AEEF`
- **KESEM GRASS GREEN**: `#A4D55D`
- **KESEM NIGHT SKY NAVY**: `#00384C`
- **KESEM MOON WHITE**: `#FFFFFF`

## 🚀 GitHub Pages Setup Instructions

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `kesem-utd-website`)
5. Make sure it's set to **Public**
6. Check "Add a README file"
7. Click "Create repository"

### Step 2: Upload Your Files

1. Click "uploading an existing file" or drag and drop files
2. Upload all the files:
   - `index.html`
   - `styles.css`
   - `navbar.html`
   - `footer.html`
3. Create an `images` folder and upload `KesemLogo.png`
4. Commit the files with a message like "Initial website files"

### Step 3: Enable GitHub Pages

1. In your repository, click on **Settings** (top menu)
2. Scroll down to **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch
5. Leave folder as **/ (root)**
6. Click **Save**

### Step 4: Access Your Website

- Your website will be available at: `https://[your-username].github.io/[repository-name]`
- It may take a few minutes to deploy initially
- GitHub will show you the URL in the Pages settings

## 📱 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessible**: Proper contrast ratios and keyboard navigation
- **Fast Loading**: Optimized CSS and minimal dependencies
- **Professional**: Clean, modern design that's both cute and professional
- **Brand Consistent**: Uses official Kesem colors throughout

## 🛠 Customization Guide

### Adding Your Logo
1. Replace `images/KesemLogo.png` with your actual logo
2. Make sure the logo is reasonably sized (recommended: 200x200px or similar)


### Customizing Colors
All colors are defined in the `:root` section of `styles.css`. You can:
- Modify existing color values
- Add new color variables
- Use the variables throughout your CSS with `var(--variable-name)`

## 🔧 Technical Notes

### For Beginners
- The website uses **HTML** for structure, **CSS** for styling, and minimal **JavaScript** for mobile menu
- All code is well-commented to help you understand what each part does
- Colors are centralized in CSS variables for easy changes
- The design is mobile-first and responsive

### For Advanced Users
- Uses CSS Grid and Flexbox for layout
- Implements CSS custom properties (variables)
- Includes accessibility features (focus states, semantic HTML)
- Mobile menu uses vanilla JavaScript (no jQuery required)
- Optimized for performance with minimal external dependencies

## 💡 Tips for Success

1. **Test on Mobile**: Always check how your site looks on phones and tablets
2. **Keep Content Updated**: Regularly update events, photos, and contact info  
3. **Use High-Quality Images**: Compress images but maintain good visual quality
4. **Monitor Performance**: Keep the site fast by optimizing images and code
5. **Backup Regularly**: GitHub serves as your backup, but commit changes frequently

## 🆘 Getting Help

If you need help:
1. Check the comments in the code files - they explain what each section does
2. GitHub Pages documentation: [docs.github.com/pages](https://docs.github.com/pages)
3. Contact your web development team (ROK ❤️)
4. Consider reaching out to other Kesem chapters who may have technical volunteers

## 📄 License

This website template is created specifically for Camp Kesem UTD. Please respect Kesem branding guidelines and trademarks when using or modifying this code.

---

**Built with ❤️ for Camp Kesem UTD**

*Supporting children and families affected by cancer through community, creative programming, and lasting friendships.*