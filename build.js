const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// The 3 React projects that need to be built using Vite
const viteProjects = [
    'womens-day-home',
    'womens-day-neon-box',
    'womens-day-neon-quiz'
];

// The vanilla HTML project that just needs to be copied verbatim
const staticProjects = [
    'Magical_Swaying_Garden-main'
];

console.log('--- Starting Global Build Pipeline for Vercel ---');

// 1. Create the master /dist directory
if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR);
console.log('✅ Master /dist directory created.');

// 2. Build and copy the Vite projects
viteProjects.forEach(project => {
    console.log(`\n📦 Building React project: ${project}...`);
    const projectPath = path.join(ROOT_DIR, project);

    // Install dependencies if node_modules is missing
    if (!fs.existsSync(path.join(projectPath, 'node_modules'))) {
        console.log(`Installing dependencies for ${project}...`);
        execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
    }

    // Run Vite Build
    execSync('npm run build', { cwd: projectPath, stdio: 'inherit' });

    // The output for Vite is usually inside /dist of that project
    const projectDist = path.join(projectPath, 'dist');
    const targetDist = path.join(DIST_DIR, project);

    if (fs.existsSync(projectDist)) {
        console.log(`Copying ${project} to master dist...`);
        // Node <= 16 fs.cpSync polyfill or use modern recursive copying
        fs.cpSync(projectDist, targetDist, { recursive: true });
        console.log(`✅ successfully packaged ${project}`);
    } else {
        console.error(`❌ Build failed: Could not find ${projectDist}`);
        process.exit(1);
    }
});

// 3. Copy the raw static HTML projects directly
staticProjects.forEach(project => {
    console.log(`\n📄 Copying static project: ${project}...`);
    const projectPath = path.join(ROOT_DIR, project);
    const targetDist = path.join(DIST_DIR, project);

    if (fs.existsSync(projectPath)) {
        fs.cpSync(projectPath, targetDist, { recursive: true });
        console.log(`✅ successfully packaged ${project}`);
    } else {
        console.error(`❌ Could not find static project ${project}`);
        process.exit(1);
    }
});

// 4. Set the Home App as the root landing page (optional but recommended!)
// Since we want the 'womens-day-home' to be the first thing they see when they go to cmcwoman.vercel.app,
// We will copy its contents directly into the root of /dist instead of burying it in /dist/womens-day-home
console.log('\n🏗️ Promoting womens-day-home to the root landing page...');
const homeDist = path.join(DIST_DIR, 'womens-day-home');
if (fs.existsSync(homeDist)) {
    // Copy all files from inside 'womens-day-home' into the root 'dist'
    const files = fs.readdirSync(homeDist);
    files.forEach(file => {
        fs.cpSync(path.join(homeDist, file), path.join(DIST_DIR, file), { recursive: true });
    });
    // Remove the redundant subdirectory
    fs.rmSync(homeDist, { recursive: true, force: true });
    console.log(`✅ Root landing page configured.`);
}

console.log('\n🎉 Global Build Pipeline Complete! Master /dist is ready for Vercel.');
