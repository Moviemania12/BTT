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
        An IP camera is a network device in which the image sensor, lens, ISP (Image Signal Processor) and network interface are all integrated. The camera compresses the video itself — typically in the H.264 or H.265 codec — and sends it to the NVR/VMS via RTSP (Real Time Streaming Protocol) or a proprietary stream. Every camera has an independent IP address — plug it into the switch, add it to the NVR, and the video comes through.
      </p>

      <p style={S.p}>
        Resolution is measured in MP (Megapixel). 2MP (1080p Full HD), 4MP, 5MP, 8MP (4K/Ultra HD) are common options. Higher resolution means more detail — and more storage and bandwidth. Resolution selection depends on the identification requirement, field of view, pixel density per target, motion characteristics and forensic objective — there is no universal data center standard. Higher resolution gives better detail but increases storage and bandwidth; decide the tradeoff according to the project specification and camera placement.
      </p>

      <p style={S.p}>
        <strong>Frame Rate (FPS)</strong> — frames per second — determines motion fluidity. Higher FPS gives smoother motion capture — important for areas with fast movement (entry/exit, turnstiles). Lower FPS saves storage and bandwidth — it can be adequate for slow-activity areas. The actual FPS requirement depends on scene activity, motion characteristics, forensic objectives and the project specification; there is no universal CCTV FPS standard.
      </p>

      <Callout type="important" title="H.265 vs H.264 — Compression Efficiency Matters">
        H.265 (HEVC) can give significantly better compression than H.264 at comparable quality — the actual savings depend on scene complexity, GOP structure, camera implementation and encoder settings. Real-world bitrate reduction varies; there is no fixed guaranteed percentage. In new deployments verify H.265 support — the NVR, VMS and network must also be compatible. Older cameras support only H.264.
      </Callout>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — CAMERA TYPES
      ═══════════════════════════════════════════════════════════════ */}
      <h2 id="camera-types" style={S.h2}>Camera Types: Dome, Bullet, PTZ & More</h2>

      <p style={S.p}>
        The camera type depends on the use case — no single type is perfect everywhere. In a data center typically a combination of multiple types is used.
      </p>

      <p style={S.p}>
        <strong>Dome Camera</strong> — ceiling-mounted, low-profile housing. Vandal-resistant versions are available. The direction is not indicated — an attacker does not know where the camera is looking. The most common choice for the server hall, corridors and general indoor areas. Fixed lens or varifocal lens options are available.
      </p>

      <p style={S.p}>
        <strong>Bullet Camera</strong> — cylindrical housing, typically mounted on a wall or ceiling arm. Better for longer range — suitable for the outdoor perimeter, parking areas, loading docks. The direction is clearly visible — the deterrence effect is strong, but in vandal-prone areas prefer a dome.
      </p>

      <p style={S.p}>
        <strong>PTZ Camera (Pan-Tilt-Zoom)</strong> — motorized pan (left/right), tilt (up/down) and optical zoom. The operator can control it remotely or program automatic presets. Useful for large open areas, perimeters and reception areas. In data centers PTZ is typically used in large server halls or outdoor areas where the operator needs to zoom into a specific area. PTZ is expensive — it needs more attention than fixed cameras.
      </p>

      <p style={S.p}>
        <strong>Fisheye/360° Camera</strong> — a single camera can cover the whole room. Dewarping software is required in the VMS for a human-viewable view. Useful for small rooms or intersections. Effective resolution is lower because the 360° image is split.
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
        A <strong>Fixed Lens</strong> is set at a fixed focal length — the angle of view is decided at install time. Simpler, cheaper, and no moving parts. A <strong>Varifocal Lens</strong> can adjust the focal length — manually at install, or there are motorized (remote) versions too. In a data center a fixed lens is typically adequate for the server hall; at entry points and perimeters a varifocal gives flexibility.
      </p>

      <p style={S.p}>
        <strong>IR (Infrared) Night Vision</strong> — there are IR LEDs around the camera that emit infrared light, invisible to the human eye but visible to the camera sensor. You get usable black-and-white footage even in the dark. IR range is specified in meters — 20m, 30m, 50m, 100m+ options are available. In a data center server hall the lighting is always on, but IR is important for the perimeter, parking and low-light storage areas.
      </p>

      <p style={S.p}>
        <strong>WDR (Wide Dynamic Range)</strong> — when a scene has bright and dark areas simultaneously, a normal camera either washes out the bright area or the dark area goes black. A WDR camera combines multiple exposures to capture both areas with usable detail. At data center entry/exit points — where there is bright light outside and dark inside — WDR is important. WDR is especially useful for mantrap cameras.
      </p>

      <Callout type="best-practice" title="Low-Light Cameras — Starlight/ColorVu Type">
        Some cameras provide color video in very low light with large aperture lenses and advanced sensors — this gives better forensic identification than IR black-and-white. These are marketed as "Starlight," "ColorVu," "Colour Night Vision," etc. by different OEMs. Specify them for generator yards, the perimeter and areas with minimal lighting.
      </Callout>
    </>
  );
}
