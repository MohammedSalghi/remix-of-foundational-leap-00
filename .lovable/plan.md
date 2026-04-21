

# Plan: Integrate Antalqa Landing Page into React App

## Current State
The preview shows a blank placeholder page. The landing page HTML was discussed but never integrated into the React project's `Index.tsx`.

## What Needs to Happen

### Step 1: Replace `src/pages/Index.tsx` with the full landing page
Convert the complete Antalqa landing page (all 15 sections) into a single React component. Since the original spec calls for a self-contained HTML file with embedded CSS and JS, the approach is:

- Embed all CSS via a `<style>` tag injected with `useEffect`, or use inline styles / Tailwind where practical
- Embed all JS interactions (scroll animations, counters, tabs, accordion, donut chart) via `useEffect` hooks
- Include the inline SVG logo directly in JSX
- Load Google Fonts (Tajawal + Cairo) via an `@import` in the CSS

### Step 2: Update `index.html`
- Set `lang="ar"` and `dir="rtl"` on the `<html>` tag
- Update `<title>` to "انطلاقة — صندوق دعم وضمان تمويل الشركات الناشئة"

### Step 3: Clean up `src/App.css`
- Remove the default Vite boilerplate styles that conflict with the landing page layout (the `#root` max-width/padding/text-align rules)

### Technical Notes
- All 15 sections will be rendered in a single `Index.tsx` component
- CSS will be embedded via a `<style>` element in the component or in `src/index.css`
- JavaScript interactions (IntersectionObserver, counters, tabs, accordion) will use React `useEffect`
- The page is entirely Arabic, RTL, using Tajawal and Cairo fonts from Google Fonts
- No external JS libraries needed

This is a large single-file component (~3000+ lines) given the scope of all 15 sections with full content, SVG logo, embedded styles, and interaction logic.

