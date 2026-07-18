"use client";

import { S, Callout, ComparisonTable } from "../shared";

export default function Cameras() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — IP CAMERAS
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="ip-cameras" style={S.h2}>IP Cameras — The Eyes of the System</h2>

      <p style={S.p}>
        IP camera ek network device hai jisme image sensor, lens, ISP (Image Signal Processor), aur
        network interface sab integrated hote hain. Camera khud video compress karta hai — typically
        H.264 ya H.265 codec mein — aur RTSP (Real Time Streaming Protocol) ya proprietary stream ke
        zariye NVR/VMS ko bhejta hai. Har camera ek independent IP address pe hoti hai — switch pe
        plug karo, NVR pe add karo, aur video aa jaati hai.
      </p>

      <p style={S.p}>
        Resolution MP (Megapixel) mein measure hoti hai. 2MP (1080p Full HD), 4MP, 5MP, 8MP (4K/Ultra HD)
        common options hain. Higher resolution matlab zyada detail — aur zyada storage aur bandwidth.
        Resolution selection identification requirement, field of view, pixel density per target, motion characteristics aur forensic objective pe depend karta hai — koi universal data center standard nahi hai. Higher resolution better detail deta hai lekin storage aur bandwidth badhta hai; tradeoff project specification aur camera placement ke hisaab se decide karo.
      </p>

      <p style={S.p}>
        <strong>Frame Rate (FPS)</strong> — frames per second — motion fluidity determine karta hai.
        Higher FPS smoother motion capture deta hai — fast movement wale areas (entry/exit, turnstiles) ke liye important hai. Lower FPS storage aur bandwidth bachata hai — slow-activity areas ke liye adequate ho sakta hai. Actual FPS requirement scene activity, motion characteristics, forensic objectives aur project specification pe depend karta hai; koi universal CCTV FPS standard nahi hai.
      </p>

      <Callout type="important" title="H.265 vs H.264 — Compression Efficiency Matters">
        H.265 (HEVC) comparable quality pe H.264 se significantly better compression de sakta hai —
        actual savings scene complexity, GOP structure, camera implementation aur encoder settings pe
        depend karti hai. Real-world bitrate reduction vary karta hai; koi fixed guaranteed percentage
        nahi hai. New deployments mein H.265 support verify karo — NVR, VMS aur network bhi compatible
        hone chahiye. Older cameras sirf H.264 support karte hain.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — CAMERA TYPES
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="camera-types" style={S.h2}>Camera Types: Dome, Bullet, PTZ & More</h2>

      <p style={S.p}>
        Camera type use case pe depend karta hai — koi ek type har jagah perfect nahi hota. Data center
        mein typically multiple types ka combination use hota hai.
      </p>

      <p style={S.p}>
        <strong>Dome Camera</strong> — ceiling-mounted, low-profile housing. Vandal-resistant versions
        available hain. Direction indicate nahi hoti — attacker ko nahi pata ki camera kahan dekh rahi
        hai. Server hall, corridors aur general indoor areas ke liye most common choice. Fixed lens ya
        varifocal lens options milte hain.
      </p>

      <p style={S.p}>
        <strong>Bullet Camera</strong> — cylindrical housing, typically wall ya ceiling arm pe mount.
        Longer range ke liye better — outdoor perimeter, parking areas, loading docks ke liye suitable.
        Direction clearly visible hoti hai — deterrence effect strong hota hai lekin vandal-prone areas
        mein dome prefer karo.
      </p>

      <p style={S.p}>
        <strong>PTZ Camera (Pan-Tilt-Zoom)</strong> — motorized pan (left/right), tilt (up/down) aur
        optical zoom. Operator remotely control kar sakta hai ya automatic presets program kar sakta hai.
        Large open areas, perimeters aur reception areas ke liye useful. Data centers mein PTZ typically
        large server halls ya outdoor areas mein use hota hai jahan operator ko specific area zoom in
        karna ho. PTZ expensive hoti hai — fixed cameras se zyada attention chahiye.
      </p>

      <p style={S.p}>
        <strong>Fisheye/360° Camera</strong> — single camera pura room cover kar sakti hai. Dewarping
        software VMS mein required hai human-viewable view ke liye. Small rooms ya intersections ke liye
        useful. Resolution effective hoti hai kyunki 360° image split hoti hai.
      </p>

      <ComparisonTable
        title="Camera Type Comparison — Data Center Use Cases"
        headers={["Type", "Best For", "Field of View", "Key Advantage", "Limitation"]}
        rows={[
          ["Dome (Fixed)", "Server halls, corridors, general indoor", "Fixed or varifocal", "Discreet, vandal-resistant", "No remote direction change"],
          ["Dome (Varifocal)", "Entry points, flexible coverage", "Adjustable at install/remotely", "Coverage adjustable post-install", "Slightly bulkier"],
          ["Bullet", "Perimeter, parking, outdoor", "Long-range, directional", "Visible deterrent, long reach", "Direction visible to intruder"],
          ["PTZ", "Large halls, perimeter patrol", "360° pan, wide tilt, optical zoom", "Operator-controlled, tracking", "Expensive, moving parts wear"],
          ["Fisheye/360°", "Small rooms, intersections", "360° hemispherical", "Single camera, full coverage", "Resolution diluted, needs dewarping"],
        ]}
      />

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — LENS, IR, WDR
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="lens-ir-wdr" style={S.h2}>Lens, IR Night Vision & WDR</h2>

      <p style={S.p}>
        <strong>Fixed Lens</strong> ek fixed focal length pe set hoti hai — angle of view install ke time
        decide hoti hai. Simpler, cheaper, aur no moving parts. <strong>Varifocal Lens</strong> focal
        length adjust kar sakte hain — manually at install, ya motorized (remote) versions bhi hain.
        Data center mein server hall ke liye fixed lens typically adequate hai; entry points aur
        perimeters pe varifocal flexibility deta hai.
      </p>

      <p style={S.p}>
        <strong>IR (Infrared) Night Vision</strong> — camera ke around IR LEDs hote hain jo infrared
        light emit karte hain, human eye ke liye invisible lekin camera sensor ke liye visible. Dark
        mein bhi usable black-and-white footage milti hai. IR range meters mein specify hoti hai —
        20m, 30m, 50m, 100m+ options available hain. Data center server hall mein lighting hamesha on
        hoti hai, lekin perimeter, parking aur low-light storage areas ke liye IR important hai.
      </p>

      <p style={S.p}>
        <strong>WDR (Wide Dynamic Range)</strong> — ek scene mein jab bright aur dark areas simultaneously
        hon to normal camera ya to bright area washout karta hai ya dark area black ho jaata hai. WDR
        camera multiple exposures combine karke dono areas usable detail mein capture karta hai. Data
        center entry/exit points pe — jahan bahar ka bright light aur andar dark — WDR important hai.
        Mantrap cameras pe WDR specially useful hai.
      </p>

      <Callout type="best-practice" title="Low-Light Cameras — Starlight/ColorVu Type">
        Some cameras large aperture lenses aur advanced sensors se very low light mein color video
        provide karte hain — IR black-and-white se better forensic identification deta hai. These are
        marketed as "Starlight," "ColorVu," "Colour Night Vision," etc. by different OEMs. Generator
        yards, perimeter aur areas with minimal lighting ke liye specify karo.
      </Callout>
    </>
  );
}
