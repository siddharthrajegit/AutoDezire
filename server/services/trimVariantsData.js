/**
 * CarWale-style Trim Variants & Feature Matrix Data
 * Covers 8 major popular models with category-wise feature breakdown.
 * Categories: safety, comfort, infotainment, convenience, exterior, performance
 */

const TRIM_VARIANTS_DATA = {
  // 1. Maruti Suzuki Swift
  Swift: [
    {
      name: 'LXi',
      priceApprox: '₹ 6.49 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Assist',
          'ABS with EBD & Brake Assist',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchors',
          'Seatbelt Reminder for All Seats'
        ],
        comfort: [
          'Manual Air Conditioning with Heater',
          'Front Power Windows',
          'Tilt-Adjustable Steering',
          'Adjustable Front Headrests'
        ],
        infotainment: [
          '12V Front Accessory Socket',
          'Roof Antenna'
        ],
        convenience: [
          'Remote Central Door Locking',
          'Internally Adjustable ORVMs',
          'Gear Shift Indicator (MT)'
        ],
        exterior: [
          'Halogen Headlamps',
          'LED High Mount Stop Lamp',
          '14-inch Steel Wheels'
        ],
        performance: [
          'Idle Start-Stop (ISS) System',
          'Electric Power Steering (EPS)'
        ]
      }
    },
    {
      name: 'VXi',
      priceApprox: '₹ 7.44 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Assist',
          'ABS with EBD & Brake Assist',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchors',
          'Seatbelt Reminder for All Seats',
          'Speed-Sensitive Auto Door Lock'
        ],
        comfort: [
          'Manual Air Conditioning with Heater',
          'Front Power Windows',
          'Rear Power Windows',
          'Tilt-Adjustable Steering',
          'Adjustable Front Headrests',
          'Driver Seat Height Adjuster',
          'Rear Parcel Tray'
        ],
        infotainment: [
          '12V Front Accessory Socket',
          'Roof Antenna',
          '7-inch SmartPlay Studio Touchscreen',
          'Wireless Android Auto & Apple CarPlay',
          '4-Speaker Audio System',
          'Steering-Mounted Audio Controls',
          'USB & Bluetooth Connectivity'
        ],
        convenience: [
          'Remote Central Door Locking',
          'Electrically Adjustable ORVMs',
          'Turn Indicators on ORVMs',
          'Gear Shift Indicator (MT)',
          'Keyless Entry'
        ],
        exterior: [
          'Halogen Headlamps',
          'LED High Mount Stop Lamp',
          'Full Wheel Covers',
          'Body-Coloured Door Handles & ORVMs',
          '14-inch Steel Wheels'
        ],
        performance: [
          'Idle Start-Stop (ISS) System',
          'Electric Power Steering (EPS)'
        ]
      }
    },
    {
      name: 'ZXi',
      priceApprox: '₹ 8.46 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Assist',
          'ABS with EBD & Brake Assist',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchors',
          'Seatbelt Reminder for All Seats',
          'Speed-Sensitive Auto Door Lock',
          'Rear Defogger',
          'Reverse Parking Camera'
        ],
        comfort: [
          'Manual Air Conditioning with Heater',
          'Front Power Windows',
          'Rear Power Windows',
          'Tilt-Adjustable Steering',
          'Adjustable Front Headrests',
          'Driver Seat Height Adjuster',
          'Rear Parcel Tray',
          'Automatic Climate Control',
          'Rear AC Vents',
          '60:40 Split Folding Rear Seats',
          'Adjustable Rear Headrests'
        ],
        infotainment: [
          '12V Front Accessory Socket',
          'Roof Antenna',
          '7-inch SmartPlay Studio Touchscreen',
          'Wireless Android Auto & Apple CarPlay',
          '6-Speaker Audio System (4 Speakers + 2 Tweeters)',
          'Steering-Mounted Audio Controls',
          'USB & Bluetooth Connectivity',
          'Wireless Smartphone Charger'
        ],
        convenience: [
          'Remote Central Door Locking',
          'Electrically Adjustable ORVMs',
          'Electrically Foldable ORVMs',
          'Turn Indicators on ORVMs',
          'Gear Shift Indicator (MT)',
          'Engine Push Start/Stop with Smart Key',
          'Rear Wiper & Washer',
          'Rear Type-A & Type-C Fast Chargers'
        ],
        exterior: [
          'LED Projector Headlamps',
          'LED Daytime Running Lamps (DRLs)',
          'LED High Mount Stop Lamp',
          '15-inch Precision Cut Alloy Wheels',
          'Body-Coloured Door Handles & ORVMs'
        ],
        performance: [
          'Idle Start-Stop (ISS) System',
          'Electric Power Steering (EPS)'
        ]
      }
    },
    {
      name: 'ZXi+',
      priceApprox: '₹ 9.60 Lakh',
      isTopModel: true,
      features: {
        safety: [
          '6 Airbags (Standard)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Assist',
          'ABS with EBD & Brake Assist',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchors',
          'Seatbelt Reminder for All Seats',
          'Speed-Sensitive Auto Door Lock',
          'Rear Defogger',
          'Reverse Parking Camera',
          'Cruise Control'
        ],
        comfort: [
          'Manual Air Conditioning with Heater',
          'Front Power Windows',
          'Rear Power Windows',
          'Tilt-Adjustable Steering',
          'Adjustable Front Headrests',
          'Driver Seat Height Adjuster',
          'Rear Parcel Tray',
          'Automatic Climate Control',
          'Rear AC Vents',
          '60:40 Split Folding Rear Seats',
          'Adjustable Rear Headrests',
          'Front Sliding Center Armrest with Storage',
          'Leather-Wrapped Steering Wheel'
        ],
        infotainment: [
          '12V Front Accessory Socket',
          'Roof Antenna',
          '9-inch SmartPlay Pro+ Touchscreen Display',
          'Wireless Android Auto & Apple CarPlay',
          'ARKAMYS Surround Sense Premium Audio',
          'Steering-Mounted Audio Controls',
          'USB & Bluetooth Connectivity',
          'Wireless Smartphone Charger',
          'Suzuki Connect Connected Car Suite (40+ Features)'
        ],
        convenience: [
          'Remote Central Door Locking',
          'Electrically Adjustable ORVMs',
          'Electrically Foldable ORVMs',
          'Auto-Folding ORVMs on Door Lock',
          'Turn Indicators on ORVMs',
          'Gear Shift Indicator (MT)',
          'Engine Push Start/Stop with Smart Key',
          'Rear Wiper & Washer',
          'Rear Type-A & Type-C Fast Chargers',
          'Auto Headlamps with Follow-Me-Home Function'
        ],
        exterior: [
          'LED Projector Headlamps',
          'LED Daytime Running Lamps (DRLs)',
          'LED Front Fog Lamps',
          'LED High Mount Stop Lamp',
          '15-inch Precision Cut Dual-Tone Alloy Wheels',
          'Dual-Tone Roof Color Options',
          'Body-Coloured Door Handles & ORVMs'
        ],
        performance: [
          'Idle Start-Stop (ISS) System',
          'Electric Power Steering (EPS)'
        ]
      }
    }
  ],

  // 2. Maruti Suzuki Dzire
  Dzire: [
    {
      name: 'LXi',
      priceApprox: '₹ 6.79 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Global NCAP Rating',
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Assist',
          'ABS with EBD',
          'Rear Parking Sensors',
          'ISOFIX Child Restraint Mounts'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Manual Air Conditioning with Heater',
          'Tilt Steering Column',
          'Adjustable Front Headrests'
        ],
        infotainment: [
          '12V Front Power Socket',
          'MID Multi-Information Instrument Display'
        ],
        convenience: [
          'Remote Central Locking',
          'Internally Adjustable ORVMs',
          'Gear Shift Prompt Indicator'
        ],
        exterior: [
          'Halogen Projector Headlamps',
          '3D LED Tail Lamps',
          '14-inch Steel Wheels with Hub Caps'
        ],
        performance: [
          'Engine Auto Idle Start-Stop',
          'Electric Power Steering'
        ]
      }
    },
    {
      name: 'VXi',
      priceApprox: '₹ 7.79 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Global NCAP Rating',
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Assist',
          'ABS with EBD',
          'Rear Parking Sensors',
          'ISOFIX Child Restraint Mounts',
          'Speed-Sensing Auto Door Lock'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Manual Air Conditioning with Heater',
          'Rear AC Vents',
          'Rear Center Armrest with Cupholders',
          'Driver Seat Height Adjuster',
          'Tilt Steering Column',
          'Adjustable Front Headrests'
        ],
        infotainment: [
          '12V Front Power Socket',
          'MID Multi-Information Instrument Display',
          '7-inch SmartPlay Studio Touchscreen',
          'Wireless Android Auto & Apple CarPlay',
          '4-Speaker Surround Sound System',
          'Steering-Mounted Audio & Calling Controls'
        ],
        convenience: [
          'Remote Central Locking',
          'Keyless Entry',
          'Electrically Adjustable ORVMs',
          'Body-Coloured ORVMs with Integrated Turn Signals',
          'Rear USB Charging Ports (Type-A + Type-C)'
        ],
        exterior: [
          'Halogen Projector Headlamps',
          '3D LED Tail Lamps',
          '14-inch Full Wheel Covers',
          'Chrome Window Beltline Garnish'
        ],
        performance: [
          'Engine Auto Idle Start-Stop',
          'Electric Power Steering'
        ]
      }
    },
    {
      name: 'ZXi',
      priceApprox: '₹ 8.89 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Global NCAP Rating',
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Assist',
          'ABS with EBD',
          'Rear Parking Sensors',
          'ISOFIX Child Restraint Mounts',
          'Speed-Sensing Auto Door Lock',
          'Reverse Parking Camera with Dynamic Guidelines',
          'Rear Window Defogger'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Automatic Climate Control',
          'Rear AC Vents',
          'Rear Center Armrest with Cupholders',
          'Driver Seat Height Adjuster',
          'Tilt Steering Column',
          'Adjustable Front & Rear Headrests',
          'Electric Single-Pane Sunroof'
        ],
        infotainment: [
          '12V Front Power Socket',
          'MID Multi-Information Instrument Display',
          '7-inch SmartPlay Pro Touchscreen',
          'Wireless Android Auto & Apple CarPlay',
          '6-Speaker Audio (4 Speakers + 2 Tweeters)',
          'Steering-Mounted Audio & Calling Controls',
          'Wireless Smartphone Charging Pad'
        ],
        convenience: [
          'Remote Central Locking',
          'Keyless Entry',
          'Engine Push Start/Stop Button',
          'Electrically Foldable & Adjustable ORVMs',
          'Body-Coloured ORVMs with Integrated Turn Signals',
          'Rear USB Charging Ports (Type-A + Type-C)',
          'Auto-On Headlamps'
        ],
        exterior: [
          'Full LED Crystal Vision Headlamps',
          'LED Daytime Running Lights (DRLs)',
          '3D LED Tail Lamps',
          '15-inch Precision Cut Alloy Wheels',
          'Chrome Window Beltline Garnish'
        ],
        performance: [
          'Engine Auto Idle Start-Stop',
          'Electric Power Steering'
        ]
      }
    },
    {
      name: 'ZXi+',
      priceApprox: '₹ 10.14 Lakh',
      isTopModel: true,
      features: {
        safety: [
          '5-Star Global NCAP Rating',
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Assist',
          'ABS with EBD',
          'Rear Parking Sensors',
          'ISOFIX Child Restraint Mounts',
          'Speed-Sensing Auto Door Lock',
          '360-Degree Surround View HD Camera',
          'Rear Window Defogger',
          'Cruise Control'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Automatic Climate Control',
          'Rear AC Vents',
          'Rear Center Armrest with Cupholders',
          'Driver Seat Height Adjuster',
          'Tilt Steering Column',
          'Adjustable Front & Rear Headrests',
          'Electric Single-Pane Sunroof',
          'Leatherette-Wrapped Steering Wheel',
          'Footwell Ambient Lighting'
        ],
        infotainment: [
          '12V Front Power Socket',
          'Color TFT Multi-Information Display',
          '9-inch SmartPlay Pro+ High-Definition Touchscreen',
          'Wireless Android Auto & Apple CarPlay',
          'ARKAMYS Premium Surround Audio Suite',
          'Steering-Mounted Audio & Calling Controls',
          'Wireless Smartphone Charging Pad',
          'Suzuki Connect Connected Car Suite (Live Tracking, Geo-fencing)'
        ],
        convenience: [
          'Remote Central Locking',
          'Keyless Entry',
          'Engine Push Start/Stop Button',
          'Electrically Foldable & Adjustable ORVMs',
          'Auto-Folding ORVMs on Walk-Away Lock',
          'Body-Coloured ORVMs with Integrated Turn Signals',
          'Rear USB Charging Ports (Type-A + Type-C)',
          'Auto-On Headlamps with Follow-Me-Home Function',
          'Rain Sensing Automatic Front Wipers'
        ],
        exterior: [
          'Full LED Crystal Vision Headlamps',
          'LED Daytime Running Lights (DRLs)',
          'LED Front Fog Lamps',
          '3D LED Tail Lamps',
          '15-inch Dual-Tone Precision Diamond-Cut Alloys',
          'Chrome Front Grille Accents',
          'Chrome Window Beltline Garnish'
        ],
        performance: [
          'Engine Auto Idle Start-Stop',
          'Electric Power Steering'
        ]
      }
    }
  ],

  // 3. Maruti Suzuki Baleno
  Baleno: [
    {
      name: 'Sigma',
      priceApprox: '₹ 6.66 Lakh',
      isTopModel: false,
      features: {
        safety: [
          'Dual Front Airbags',
          'ABS with EBD & Brake Assist',
          'ESP with Hill Hold Assist',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchors'
        ],
        comfort: [
          'Automatic Climate Control (Standard)',
          'Front Power Windows',
          'Tilt Steering Wheel',
          'Adjustable Front Headrests'
        ],
        infotainment: [
          'Digital Instrument Cluster with Gear Indicator',
          '12V Front Power Socket'
        ],
        convenience: [
          'Central Locking',
          'Keyless Entry',
          'Internally Adjustable ORVMs'
        ],
        exterior: [
          'Halogen Projector Headlamps',
          'LED Taillights',
          '15-inch Steel Wheels'
        ],
        performance: [
          'Idle Start-Stop System',
          'Electric Power Steering'
        ]
      }
    },
    {
      name: 'Delta',
      priceApprox: '₹ 7.50 Lakh',
      isTopModel: false,
      features: {
        safety: [
          'Dual Front Airbags',
          'ABS with EBD & Brake Assist',
          'ESP with Hill Hold Assist',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchors',
          'Speed-Sensing Auto Door Lock'
        ],
        comfort: [
          'Automatic Climate Control (Standard)',
          'Front & Rear Power Windows',
          'Tilt Steering Wheel',
          'Adjustable Front Headrests',
          'Rear Parcel Shelf'
        ],
        infotainment: [
          'Digital Instrument Cluster with Gear Indicator',
          '12V Front Power Socket',
          '7-inch SmartPlay Studio Touchscreen',
          'Wireless Android Auto & Apple CarPlay',
          '4 Speakers Audio System',
          'Steering-Mounted Audio Controls'
        ],
        convenience: [
          'Central Locking',
          'Keyless Entry',
          'Electrically Adjustable & Foldable ORVMs',
          'Turn Indicators on ORVMs'
        ],
        exterior: [
          'Halogen Projector Headlamps',
          'LED Taillights',
          'Full Wheel Covers',
          'Body-Colored Door Handles & Mirrors'
        ],
        performance: [
          'Idle Start-Stop System',
          'Electric Power Steering'
        ]
      }
    },
    {
      name: 'Zeta',
      priceApprox: '₹ 8.43 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Front, Side & Curtain)',
          'ABS with EBD & Brake Assist',
          'ESP with Hill Hold Assist',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchors',
          'Speed-Sensing Auto Door Lock',
          'Rear View Camera',
          'Rear Defogger & Wiper-Washer'
        ],
        comfort: [
          'Automatic Climate Control (Standard)',
          'Rear AC Vents',
          'Front & Rear Power Windows',
          'Tilt & Telescopic Steering Wheel',
          'Driver Seat Height Adjuster',
          'Front Center Armrest with Storage',
          '60:40 Split Rear Seat',
          'Rear Fast Charging USB Ports'
        ],
        infotainment: [
          'Digital Instrument Cluster with Gear Indicator',
          '12V Front Power Socket',
          '7-inch SmartPlay Pro Touchscreen',
          'Wireless Android Auto & Apple CarPlay',
          '6-Speaker Audio (4 Speakers + 2 Tweeters)',
          'Steering-Mounted Audio Controls',
          'Suzuki Connect Connected Car Features'
        ],
        convenience: [
          'Central Locking',
          'Push Button Start/Stop with Smart Key',
          'Electrically Adjustable & Auto-Folding ORVMs',
          'Auto-Dimming IRVM',
          'Auto Headlamps with Follow-Me-Home'
        ],
        exterior: [
          'LED Projector Headlamps with LED DRLs',
          'LED Taillights',
          '16-inch Precision Alloy Wheels',
          'Chrome Door Handles'
        ],
        performance: [
          'Idle Start-Stop System',
          'Electric Power Steering'
        ]
      }
    },
    {
      name: 'Alpha',
      priceApprox: '₹ 9.88 Lakh',
      isTopModel: true,
      features: {
        safety: [
          '6 Airbags (Front, Side & Curtain)',
          'ABS with EBD & Brake Assist',
          'ESP with Hill Hold Assist',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchors',
          'Speed-Sensing Auto Door Lock',
          '360-Degree View HD Camera System',
          'Rear Defogger & Wiper-Washer',
          'Cruise Control'
        ],
        comfort: [
          'Automatic Climate Control (Standard)',
          'Rear AC Vents',
          'Front & Rear Power Windows',
          'Tilt & Telescopic Steering Wheel',
          'Driver Seat Height Adjuster',
          'Front Center Armrest with Storage',
          '60:40 Split Rear Seat',
          'Rear Fast Charging USB Ports',
          'Leather-Wrapped Steering Wheel',
          'UV Cut Window Glasses'
        ],
        infotainment: [
          'Heads-Up Display (HUD) Colored Unit',
          '9-inch SmartPlay Pro+ Touchscreen Display',
          'Wireless Android Auto & Apple CarPlay',
          'ARKAMYS Premium Audio Tuning with Surround Sound',
          'Steering-Mounted Audio Controls',
          'Suzuki Connect Connected Car Features (Live Tracking, Geofence)'
        ],
        convenience: [
          'Central Locking',
          'Push Button Start/Stop with Smart Key',
          'Electrically Adjustable & Auto-Folding ORVMs',
          'Auto-Dimming IRVM',
          'Auto Headlamps with Follow-Me-Home',
          'Wireless Smartphone Charger'
        ],
        exterior: [
          'LED Projector Headlamps with LED DRLs',
          'LED Front Fog Lamps',
          'LED Taillights',
          '16-inch Dual-Tone Precision Cut Alloys',
          'Chrome Door Handles & Window Beltline'
        ],
        performance: [
          'Idle Start-Stop System',
          'Electric Power Steering'
        ]
      }
    }
  ],

  // 4. Tata Nexon
  Nexon: [
    {
      name: 'Smart',
      priceApprox: '₹ 8.00 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Bharat NCAP & Global NCAP Safety Rating',
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Control',
          'ABS with EBD & Brake Disc Wiping',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchor Points'
        ],
        comfort: [
          'Front Power Windows',
          'Manual Air Conditioning',
          'Tilt & Collapsible Steering Column',
          'Fabric Upholstery'
        ],
        infotainment: [
          'Digital Instrument Cluster Display',
          '12V Front Power Outlet'
        ],
        convenience: [
          'Central Door Locking',
          'Internally Adjustable Outside Mirrors'
        ],
        exterior: [
          'LED Headlamps & Bi-Function DRLs',
          'LED X-Factor Connected Taillamps',
          '16-inch Steel Wheels'
        ],
        performance: [
          'Multi-Drive Modes (Eco, City, Sport)'
        ]
      }
    },
    {
      name: 'Smart+',
      priceApprox: '₹ 9.20 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Bharat NCAP & Global NCAP Safety Rating',
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Control',
          'ABS with EBD & Brake Disc Wiping',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchor Points'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Manual Air Conditioning',
          'Tilt & Collapsible Steering Column',
          'Fabric Upholstery'
        ],
        infotainment: [
          'Digital Instrument Cluster Display',
          '7-inch Floating Touchscreen Infotainment System',
          'Wireless Apple CarPlay & Android Auto',
          '4-Speaker Audio Setup',
          'Steering Wheel with Backlit Tata Logo & Audio Controls'
        ],
        convenience: [
          'Central Door Locking',
          'Electrically Adjustable Outside Mirrors'
        ],
        exterior: [
          'LED Headlamps & Bi-Function DRLs',
          'LED X-Factor Connected Taillamps',
          'Wheel Covers',
          'Roof Rails'
        ],
        performance: [
          'Multi-Drive Modes (Eco, City, Sport)'
        ]
      }
    },
    {
      name: 'Pure',
      priceApprox: '₹ 10.30 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Bharat NCAP & Global NCAP Safety Rating',
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Control',
          'ABS with EBD & Brake Disc Wiping',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchor Points',
          'Reverse Parking Camera'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Rear AC Vents',
          'Roof-Mounted Rear Reading Lamps',
          'Tilt & Collapsible Steering Column'
        ],
        infotainment: [
          'Full Digital Instrument Cluster with Navigation Display',
          '7-inch Floating Touchscreen Infotainment System',
          'Wireless Apple CarPlay & Android Auto',
          '4-Speaker Audio Setup',
          'Steering Wheel with Backlit Tata Logo & Audio Controls'
        ],
        convenience: [
          'Electrically Foldable ORVMs',
          'Voice Assisted Air Conditioning Controls'
        ],
        exterior: [
          'Bi-LED Headlamps with Extended DRLs',
          'Connected Sequential LED Taillamps',
          'Wheel Covers',
          'Functional Roof Rails'
        ],
        performance: [
          'Multi-Drive Modes (Eco, City, Sport)'
        ]
      }
    },
    {
      name: 'Creative',
      priceApprox: '₹ 11.70 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Bharat NCAP & Global NCAP Safety Rating',
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Control',
          'ABS with EBD & Brake Disc Wiping',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Anchor Points',
          'Reverse Parking Camera',
          'Tyre Pressure Monitoring System (TPMS)'
        ],
        comfort: [
          'Automatic Climate Control (FATC)',
          'Rear AC Vents',
          'Driver Seat Height Adjuster',
          'Front Center Armrest with Cooled Storage',
          'Front & Rear Power Windows',
          'Tilt & Telescopic Steering'
        ],
        infotainment: [
          '10.25-inch High-Resolution Touchscreen by HARMAN',
          'Wireless Apple CarPlay & Android Auto',
          '8-Speaker Audio System (4 Speakers + 4 Tweeters)',
          'Full Digital 10.25-inch Instrument Cluster with Maps',
          'Steering Mounted Audio & Phone Controls'
        ],
        convenience: [
          'Push Button Start/Stop with Smart Key',
          'Electrically Foldable & Auto-Folding ORVMs',
          'Rear Wiper & Washer with Defogger',
          'Cruise Control',
          'Auto-Dimming IRVM'
        ],
        exterior: [
          'Sequential LED Front & Rear Turn Indicators',
          '16-inch Alloy Wheels with Aero Inserts',
          'Shark Fin Antenna',
          'Body-Coloured Door Handles'
        ],
        performance: [
          'Multi-Drive Modes (Eco, City, Sport)',
          'Paddle Shifters (Automatic DCA/AMT)'
        ]
      }
    },
    {
      name: 'Fearless',
      priceApprox: '₹ 13.50 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Bharat NCAP & Global NCAP Safety Rating',
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Control',
          'ABS with EBD & Brake Disc Wiping',
          'Front & Rear Parking Sensors',
          'ISOFIX Child Seat Anchor Points',
          '360-Degree Surround HD Camera with Blind Spot Monitor',
          'Tyre Pressure Monitoring System (TPMS)',
          'Front Fog Lamps with Cornering Function'
        ],
        comfort: [
          'Automatic Climate Control (FATC)',
          'Voice-Assisted Electric Sunroof',
          'Rear AC Vents',
          'Driver Seat Height Adjuster',
          'Front Center Armrest with Cooled Storage',
          'Rear Seat Center Armrest with Cup Holders',
          '60:40 Split Rear Seat',
          'Leatherette Seats with Contrast Stitching'
        ],
        infotainment: [
          '10.25-inch High-Resolution Touchscreen by HARMAN',
          'Wireless Apple CarPlay & Android Auto',
          'JBL Premium Sound System with Subwoofer',
          'Full Digital 10.25-inch Instrument Cluster with Maps',
          'Wireless Smartphone Charging Pad'
        ],
        convenience: [
          'Push Button Start/Stop with Smart Key',
          'Electrically Foldable & Auto-Folding ORVMs',
          'Rear Wiper & Washer with Defogger',
          'Cruise Control',
          'Auto Headlamps with Follow-Me-Home',
          'Rain-Sensing Auto Wipers'
        ],
        exterior: [
          'Sequential LED Front & Rear Turn Indicators',
          '16-inch Diamond Cut Alloy Wheels',
          'Dual-Tone Contrast Roof Color',
          'Shark Fin Antenna'
        ],
        performance: [
          'Multi-Drive Modes (Eco, City, Sport)',
          'Paddle Shifters (Automatic DCA/AMT)'
        ]
      }
    },
    {
      name: 'Fearless+',
      priceApprox: '₹ 15.80 Lakh',
      isTopModel: true,
      features: {
        safety: [
          '5-Star Bharat NCAP & Global NCAP Safety Rating',
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Program (ESP)',
          'Hill Hold Control',
          'ABS with EBD & Brake Disc Wiping',
          'Front & Rear Parking Sensors',
          'ISOFIX Child Seat Anchor Points',
          '360-Degree Surround HD Camera with Blind Spot Monitor',
          'Tyre Pressure Monitoring System (TPMS)',
          'Front Fog Lamps with Cornering Function',
          'Emergency Call (E-Call) & Breakdown Call (B-Call)'
        ],
        comfort: [
          'Ventilated Front Seats (Driver & Co-Driver)',
          'Automatic Climate Control (FATC) with Express Cool',
          'Air Purifier with AQI Display',
          'Voice-Assisted Panoramic / Electric Sunroof',
          'Rear AC Vents',
          'Driver Seat Height Adjuster',
          'Front Center Armrest with Cooled Storage',
          'Rear Seat Center Armrest with Cup Holders',
          '60:40 Split Rear Seat',
          'Premium Benecke-Kaliko Leatherette Upholstery'
        ],
        infotainment: [
          '10.25-inch High-Resolution Touchscreen by HARMAN',
          'Wireless Apple CarPlay & Android Auto',
          'JBL 9-Speaker Cinematic Sound System with Subwoofer & Amplifier',
          'Full Digital 10.25-inch Instrument Cluster with Maps',
          'Wireless Smartphone Charging Pad',
          'iRA 2.0 Connected Car Technology with Remote Engine Start/Stop'
        ],
        convenience: [
          'Push Button Start/Stop with Smart Key',
          'Electrically Foldable & Auto-Folding ORVMs',
          'Rear Wiper & Washer with Defogger',
          'Cruise Control',
          'Auto Headlamps with Follow-Me-Home',
          'Rain-Sensing Auto Wipers',
          'Auto-Dimming Frameless Rear View Mirror',
          'Grand Floor Console with Leatherette Armrest'
        ],
        exterior: [
          'Sequential LED Front & Rear Turn Indicators with Welcome/Goodbye Animations',
          '16-inch Diamond Cut Aerodynamic Alloy Wheels',
          'Dual-Tone Contrast Roof Color',
          'Hidden Rear Wiper Integrated in Roof Spoiler',
          'Shark Fin Antenna'
        ],
        performance: [
          'Multi-Drive Modes (Eco, City, Sport)',
          'Paddle Shifters (Automatic DCA/AMT)'
        ]
      }
    }
  ],

  // 5. Tata Punch
  Punch: [
    {
      name: 'Pure',
      priceApprox: '₹ 6.13 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Global NCAP Safety Rating',
          'Dual Front Airbags',
          'ABS with EBD & Corner Stability Control',
          'Rear Parking Sensors',
          'ISOFIX Child Restraint Mounts',
          'Brake Disc Wiping'
        ],
        comfort: [
          'Front Power Windows',
          'Manual Air Conditioning with Heater',
          'Tilt Steering Column',
          '90-Degree Opening Doors'
        ],
        infotainment: [
          'Digital Instrument Cluster',
          '12V Front Power Outlet'
        ],
        convenience: [
          'Central Locking with Key',
          'Internally Adjustable Wing Mirrors'
        ],
        exterior: [
          'Halogen Headlamps',
          'LED Turn Indicators on ORVMs',
          '15-inch Steel Wheels'
        ],
        performance: [
          'City & Eco Drive Modes',
          'Engine Auto Start-Stop (ISS)'
        ]
      }
    },
    {
      name: 'Adventure',
      priceApprox: '₹ 7.00 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Global NCAP Safety Rating',
          'Dual Front Airbags',
          'ABS with EBD & Corner Stability Control',
          'Rear Parking Sensors',
          'ISOFIX Child Restraint Mounts',
          'Brake Disc Wiping',
          'Anti-Glare Inside Rear View Mirror'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Manual Air Conditioning with Heater',
          'Tilt Steering Column',
          '90-Degree Opening Doors',
          'Driver Seat Footrest'
        ],
        infotainment: [
          'Digital Instrument Cluster',
          '7-inch Floating Infotainment Touchscreen',
          'Apple CarPlay & Android Auto',
          '4 Speakers Audio System',
          'Steering-Mounted Audio & Phone Controls'
        ],
        convenience: [
          'Remote Central Keyless Entry',
          'Electrically Adjustable ORVMs',
          'Follow-Me-Home Headlamps',
          'Fast USB Charging Port'
        ],
        exterior: [
          'Halogen Headlamps',
          'LED Turn Indicators on ORVMs',
          'Full Wheel Covers',
          'Body-Coloured Door Handles'
        ],
        performance: [
          'City & Eco Drive Modes',
          'Engine Auto Start-Stop (ISS)'
        ]
      }
    },
    {
      name: 'Accomplished',
      priceApprox: '₹ 7.85 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Global NCAP Safety Rating',
          'Dual Front Airbags',
          'ABS with EBD & Corner Stability Control',
          'Rear Parking Sensors',
          'ISOFIX Child Restraint Mounts',
          'Brake Disc Wiping',
          'Rear Parking Camera with Guidelines',
          'Front Fog Lamps'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Driver Seat Height Adjustment',
          'Front Center Armrest',
          'Manual Air Conditioning with Heater',
          'Tilt Steering Column',
          '90-Degree Opening Doors'
        ],
        infotainment: [
          'Digital Instrument Cluster',
          '7-inch Floating Infotainment Touchscreen by HARMAN',
          'Apple CarPlay & Android Auto',
          '6-Speaker Audio (4 Speakers + 2 Tweeters)',
          'Steering-Mounted Audio & Phone Controls'
        ],
        convenience: [
          'Push Button Engine Start/Stop',
          'Cruise Control',
          'Electrically Adjustable & Foldable ORVMs',
          'Remote Central Keyless Entry',
          'Fast USB Charging Port'
        ],
        exterior: [
          'LED Daytime Running Lamps (DRLs)',
          'LED Tail Lamps',
          '15-inch Hyper-Style Steel Wheels',
          'Roof Rails'
        ],
        performance: [
          'City & Eco Drive Modes',
          'Engine Auto Start-Stop (ISS)',
          'Traction Pro Mode (AMT only)'
        ]
      }
    },
    {
      name: 'Creative',
      priceApprox: '₹ 9.00 Lakh',
      isTopModel: true,
      features: {
        safety: [
          '5-Star Global NCAP Safety Rating',
          'Dual Front Airbags',
          'ABS with EBD & Corner Stability Control',
          'Rear Parking Sensors',
          'ISOFIX Child Restraint Mounts',
          'Brake Disc Wiping',
          'Rear Parking Camera with Guidelines',
          'Front Fog Lamps with Cornering Function',
          'Rear Window Wiper, Washer & Defogger',
          'Tyre Pressure Monitoring System (TPMS)'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Automatic Climate Control (FATC)',
          'Voice-Assisted Electric Sunroof',
          'Driver Seat Height Adjustment',
          'Front Center Armrest',
          'Rear Center Armrest with Cupholders',
          'Cooled Glovebox',
          'Leather-Wrapped Steering Wheel & Gear Knob',
          '90-Degree Opening Doors'
        ],
        infotainment: [
          '7-inch TFT Color Multi-Information Instrument Cluster',
          '7-inch Floating Infotainment Touchscreen by HARMAN',
          'Apple CarPlay & Android Auto',
          '6-Speaker Audio (4 Speakers + 2 Tweeters)',
          'Wireless Smartphone Charger',
          'iRA Connected Car Technology Suite',
          'Steering-Mounted Audio & Phone Controls'
        ],
        convenience: [
          'Push Button Engine Start/Stop',
          'Cruise Control',
          'Electrically Adjustable & Auto-Folding ORVMs',
          'Auto-On Projector Headlamps',
          'Rain-Sensing Front Wipers',
          'Fast USB Charging Port'
        ],
        exterior: [
          'Projector Headlamps with Signature LED DRLs',
          'LED Tail Lamps',
          '16-inch Diamond-Cut Dual-Tone Alloy Wheels',
          'Dual-Tone Roof Contrast Color',
          'Shark Fin Roof Antenna',
          'Puddle Lamps'
        ],
        performance: [
          'City & Eco Drive Modes',
          'Engine Auto Start-Stop (ISS)',
          'Traction Pro Mode (AMT only)'
        ]
      }
    }
  ],

  // 6. Hyundai Creta
  Creta: [
    {
      name: 'E',
      priceApprox: '₹ 11.00 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Control (ESC)',
          'Vehicle Stability Management (VSM)',
          'Hill Start Assist Control (HAC)',
          'All 4 Disc Brakes',
          'ABS with EBD',
          'Rear Parking Sensors',
          'Tyre Pressure Monitoring System (Highline TPMS)',
          'ISOFIX Child Seat Anchors'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Manual Air Conditioning with Heater',
          'Rear AC Vents',
          'Driver Seat Height Adjustment',
          'Front Center Armrest with Storage',
          '60:40 Split Folding Rear Seats',
          'Tilt Steering Column'
        ],
        infotainment: [
          'Digital Cluster with Multi-Information Display',
          '12V Front Power Outlet'
        ],
        convenience: [
          'Remote Central Locking with Foldable Key',
          'Electrically Adjustable Outside Mirrors',
          'Gear Shift Indicator (MT)'
        ],
        exterior: [
          'Dual-Tone Front Grille',
          'LED Positioning Lamps',
          '16-inch Steel Wheels with Wheel Covers'
        ],
        performance: [
          'Idle Stop & Go (ISG) System'
        ]
      }
    },
    {
      name: 'EX',
      priceApprox: '₹ 12.21 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Control (ESC)',
          'Vehicle Stability Management (VSM)',
          'Hill Start Assist Control (HAC)',
          'All 4 Disc Brakes',
          'ABS with EBD',
          'Rear Parking Sensors',
          'Tyre Pressure Monitoring System (Highline TPMS)',
          'ISOFIX Child Seat Anchors'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Manual Air Conditioning with Heater',
          'Rear AC Vents',
          'Driver Seat Height Adjustment',
          'Front Center Armrest with Storage',
          'Rear Parcel Shelf',
          '60:40 Split Folding Rear Seats',
          'Tilt Steering Column'
        ],
        infotainment: [
          'Digital Cluster with Multi-Information Display',
          '8-inch Touchscreen Audio Display',
          'Wireless Android Auto & Apple CarPlay',
          '4-Speaker Audio System',
          'Steering-Mounted Audio & Voice Controls',
          'Front USB-C Charger & Rear Dual USB-C Ports'
        ],
        convenience: [
          'Remote Central Locking with Foldable Key',
          'Electrically Adjustable Outside Mirrors',
          'Turn Signal on Outside Mirrors',
          'Shark Fin Antenna'
        ],
        exterior: [
          'LED Positioning Lamps',
          'Body-Coloured Outside Mirrors & Door Handles',
          '16-inch Styled Steel Wheels'
        ],
        performance: [
          'Idle Stop & Go (ISG) System'
        ]
      }
    },
    {
      name: 'S',
      priceApprox: '₹ 13.43 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Control (ESC)',
          'Vehicle Stability Management (VSM)',
          'Hill Start Assist Control (HAC)',
          'All 4 Disc Brakes',
          'ABS with EBD',
          'Rear Parking Sensors',
          'Rear View Camera with Parking Guidelines',
          'Tyre Pressure Monitoring System (Highline TPMS)',
          'ISOFIX Child Seat Anchors',
          'Rear Window Defogger'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Manual Air Conditioning with Heater',
          'Rear AC Vents',
          'Driver Seat Height Adjustment',
          'Rear Seat Window Sunshade Curtains',
          'Rear Center Armrest with Cupholders',
          '60:40 Split Folding Rear Seats',
          'Tilt & Telescopic Steering'
        ],
        infotainment: [
          '8-inch Touchscreen Audio Display',
          'Wireless Android Auto & Apple CarPlay',
          '6-Speaker Audio (4 Speakers + 2 Tweeters)',
          'Steering-Mounted Audio & Voice Controls',
          'Front USB-C Charger & Rear Dual USB-C Ports'
        ],
        convenience: [
          'Cruise Control',
          'Automatic Headlamps with Follow-Me-Home',
          'Rear Wiper & Washer',
          'Electrically Adjustable & Foldable ORVMs'
        ],
        exterior: [
          'Quad-Beam LED Headlamps',
          'Horizon LED Front Positioning & DRLs',
          'Connecting Horizon LED Taillamps',
          '16-inch Dual-Tone Stylised Wheels',
          'Roof Rails'
        ],
        performance: [
          'Idle Stop & Go (ISG) System'
        ]
      }
    },
    {
      name: 'S(O)',
      priceApprox: '₹ 14.36 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Control (ESC)',
          'Vehicle Stability Management (VSM)',
          'Hill Start Assist Control (HAC)',
          'All 4 Disc Brakes',
          'ABS with EBD',
          'Rear Parking Sensors',
          'Rear View Camera with Parking Guidelines',
          'Tyre Pressure Monitoring System (Highline TPMS)',
          'ISOFIX Child Seat Anchors',
          'Rear Window Defogger'
        ],
        comfort: [
          'Dual-Zone Automatic Temperature Control (FATC)',
          'Voice-Enabled Smart Panoramic Sunroof',
          'Rear AC Vents',
          'Driver Seat Height Adjustment',
          'Rear Seat Window Sunshade Curtains',
          'Rear Center Armrest with Cupholders',
          '60:40 Split Folding Rear Seats',
          'Tilt & Telescopic Steering'
        ],
        infotainment: [
          '8-inch Touchscreen Audio Display',
          'Wireless Android Auto & Apple CarPlay',
          '6-Speaker Audio (4 Speakers + 2 Tweeters)',
          'Steering-Mounted Audio & Voice Controls',
          'Wireless Smartphone Charger'
        ],
        convenience: [
          'Push Button Start/Stop with Smart Key',
          'Electronic Parking Brake with Auto Hold (AT)',
          'Cruise Control',
          'Auto-Folding Outside Mirrors',
          'Automatic Headlamps'
        ],
        exterior: [
          'Quad-Beam LED Headlamps',
          'Horizon LED Front Positioning & DRLs',
          'Connecting Horizon LED Taillamps',
          '17-inch Black/Dual-Tone Alloy Wheels',
          'Roof Rails'
        ],
        performance: [
          'Drive Modes (Eco, Normal, Sport - AT)',
          'Traction Control Modes (Snow, Mud, Sand - AT)',
          'Paddle Shifters (AT/DCT/IVT)'
        ]
      }
    },
    {
      name: 'SX',
      priceApprox: '₹ 15.30 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Control (ESC)',
          'Vehicle Stability Management (VSM)',
          'Hill Start Assist Control (HAC)',
          'All 4 Disc Brakes',
          'ABS with EBD',
          'Rear Parking Sensors',
          'Rear View Camera with Dynamic Guidelines',
          'Tyre Pressure Monitoring System (Highline TPMS)',
          'ISOFIX Child Seat Anchors',
          'Electrochromic Inside Rearview Mirror (Auto-Dimming IRVM)'
        ],
        comfort: [
          'Dual-Zone Automatic Temperature Control (FATC)',
          'Voice-Enabled Smart Panoramic Sunroof',
          'Rear AC Vents',
          '2-Step Reclining Rear Seats',
          'Rear Seat Window Sunshade Curtains',
          'Rear Center Armrest with Cupholders',
          'Leatherette-Wrapped D-Cut Steering Wheel & Gear Knob',
          'Tilt & Telescopic Steering'
        ],
        infotainment: [
          '10.25-inch HD Touchscreen Infotainment System',
          'Navigation with Live Traffic & Over-the-Air (OTA) Updates',
          'Android Auto & Apple CarPlay',
          'Hyundai BlueLink Connected Car Suite (70+ Connected Features)',
          'Bose Premium 8-Speaker Audio System with Subwoofer',
          'Wireless Smartphone Charger'
        ],
        convenience: [
          'Push Button Start/Stop with Smart Key',
          'Electronic Parking Brake with Auto Hold',
          'Cruise Control',
          'Auto-Folding Outside Mirrors',
          'Automatic Headlamps'
        ],
        exterior: [
          'Quad-Beam LED Headlamps',
          'Horizon LED Front Positioning & DRLs',
          'Connecting Horizon LED Taillamps',
          '17-inch Diamond Cut Alloy Wheels',
          'Chrome Door Handles',
          'Puddle Lamps with Welcome Function'
        ],
        performance: [
          'Drive Modes (Eco, Normal, Sport - AT)',
          'Paddle Shifters (AT/DCT/IVT)'
        ]
      }
    },
    {
      name: 'SX(O)',
      priceApprox: '₹ 20.15 Lakh',
      isTopModel: true,
      features: {
        safety: [
          'Hyundai SmartSense Level 2 ADAS Suite (19 Autonomous Features)',
          'Forward Collision Warning & Avoidance Assist (Car/Pedestrian/Cyclist/Junction)',
          'Lane Keeping Assist & Lane Following Assist',
          'Blind-Spot View Monitor (BVM) & Collision Avoidance Assist',
          'Smart Cruise Control with Stop & Go',
          'Safe Exit Warning & Rear Cross-Traffic Collision Avoidance',
          '6 Airbags (Standard across all trims)',
          '360-Degree Surround View Monitor (SVM) with 3D View',
          'Electronic Stability Control (ESC) & VSM',
          'Hill Start Assist Control (HAC)',
          'All 4 Disc Brakes',
          'Front & Rear Parking Sensors',
          'Tyre Pressure Monitoring System (Highline TPMS)'
        ],
        comfort: [
          'Ventilated Front Seats (3 Levels Cooling)',
          '8-Way Power Adjustable Driver Seat',
          'Dual-Zone Automatic Temperature Control (FATC)',
          'Voice-Enabled Smart Panoramic Sunroof',
          'Rear AC Vents with Two-Stage Blower Control',
          '2-Step Reclining Rear Seats with Cushion Pillows',
          'Rear Seat Window Sunshade Curtains',
          'Two-Tone Premium Leatherette Seat Upholstery',
          'Soothing Ambient Mood Lighting (64 Colors)'
        ],
        infotainment: [
          'Seamless Dual Integrated 10.25-inch Digital Cockpit Screens',
          '10.25-inch Full Digital Super-Vision Cluster with Themes',
          '10.25-inch HD Touchscreen Infotainment with Navigation',
          'Bose Premium 8-Speaker Sound System with Subwoofer & Central Speaker',
          'Hyundai BlueLink Connected Car Suite with Alexa Home-to-Car',
          'Android Auto & Apple CarPlay',
          'Wireless Smartphone Charger with Cooling Pad'
        ],
        convenience: [
          'Push Button Start/Stop with Smart Key & Remote Engine Start',
          'Electronic Parking Brake (EPB) with Auto Hold',
          'Rain-Sensing Automatic Front Wipers',
          'Auto-Folding Outside Mirrors with Memory',
          'Electrochromic Inside Rearview Mirror with SOS & BlueLink Buttons',
          'Cooled Glove Box'
        ],
        exterior: [
          'Quad-Beam Full LED Headlamps with Sequential Front Turn Indicators',
          'Horizon Continuous LED Front DRL Light Bar',
          'Connecting Horizon Seamless LED Taillamps',
          '17-inch Diamond Cut Dual-Tone Aero Alloy Wheels',
          'Satin Chrome Door Handles & Window Beltline',
          'Aerodynamic Rear Spoiler with High-Mounted Stop Lamp'
        ],
        performance: [
          'Traction Control Modes (Snow, Mud, Sand)',
          'Multi-Terrain Drive Modes (Eco, Normal, Sport)',
          'Steering Wheel Paddle Shifters'
        ]
      }
    }
  ],

  // 7. Hyundai i20
  i20: [
    {
      name: 'Era',
      priceApprox: '₹ 7.04 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Control (ESC)',
          'Vehicle Stability Management (VSM)',
          'Hill Assist Control (HAC)',
          'ABS with EBD',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Mounts'
        ],
        comfort: [
          'Front Power Windows',
          'Manual Air Conditioning',
          'Tilt & Telescopic Steering Column',
          'Adjustable Front Headrests'
        ],
        infotainment: [
          'Digital Instrument Cluster with MID',
          '12V Front Power Outlet',
          'USB Type-C Front Fast Charger'
        ],
        convenience: [
          'Central Locking',
          'Internally Adjustable ORVMs'
        ],
        exterior: [
          'Halogen Headlamps',
          'Signature Z-Shaped LED Tail Lamps',
          '14-inch Steel Wheels with Hub Caps'
        ],
        performance: [
          'Idle Stop & Go (ISG)',
          'Electric Power Steering'
        ]
      }
    },
    {
      name: 'Magna',
      priceApprox: '₹ 7.75 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Control (ESC)',
          'Vehicle Stability Management (VSM)',
          'Hill Assist Control (HAC)',
          'ABS with EBD',
          'Rear Parking Sensors',
          'ISOFIX Child Seat Mounts',
          'Tyre Pressure Monitoring System (Highline TPMS)'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Rear AC Vents',
          'Driver Seat Height Adjustment',
          'Front Center Armrest with Storage',
          'Manual Air Conditioning',
          'Tilt & Telescopic Steering Column'
        ],
        infotainment: [
          'Digital Instrument Cluster with MID',
          '8-inch Touchscreen Display Audio',
          'Wireless Apple CarPlay & Android Auto',
          'Steering Wheel Mounted Audio Controls',
          'Voice Recognition'
        ],
        convenience: [
          'Remote Central Keyless Entry',
          'Electrically Adjustable ORVMs',
          'Auto-Headlamps with Follow-Me-Home',
          'Shark Fin Antenna'
        ],
        exterior: [
          'LED Daytime Running Lamps (DRLs)',
          'Signature Z-Shaped LED Tail Lamps',
          '15-inch Steel Wheels with Full Wheel Covers'
        ],
        performance: [
          'Idle Stop & Go (ISG)',
          'Electric Power Steering'
        ]
      }
    },
    {
      name: 'Sportz',
      priceApprox: '₹ 8.38 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Control (ESC)',
          'Vehicle Stability Management (VSM)',
          'Hill Assist Control (HAC)',
          'ABS with EBD',
          'Rear Parking Sensors',
          'Rear View Camera with Parking Guidelines',
          'Tyre Pressure Monitoring System (Highline TPMS)',
          'Rear Defogger'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Automatic Climate Control (FATC)',
          'Rear AC Vents',
          'Driver Seat Height Adjustment',
          'Front Center Armrest with Storage',
          'Tilt & Telescopic Steering Column'
        ],
        infotainment: [
          'Digital Instrument Cluster with MID',
          '8-inch Touchscreen Display Audio',
          'Wireless Apple CarPlay & Android Auto',
          '6-Speaker Audio System (4 Speakers + 2 Tweeters)',
          'Steering Wheel Mounted Audio Controls'
        ],
        convenience: [
          'Cruise Control',
          'Electrically Foldable ORVMs',
          'Emergency Stop Signal (ESS)',
          'Auto-Headlamps with Follow-Me-Home'
        ],
        exterior: [
          'LED Headlamps with Signature LED DRLs',
          'Signature Z-Shaped LED Tail Lamps',
          '16-inch Dual-Tone Stylised Steel Wheels',
          'Side Sill Garnishing'
        ],
        performance: [
          'Idle Stop & Go (ISG)',
          'Electric Power Steering'
        ]
      }
    },
    {
      name: 'Asta(O)',
      priceApprox: '₹ 10.00 Lakh',
      isTopModel: true,
      features: {
        safety: [
          '6 Airbags (Standard across all variants)',
          'Electronic Stability Control (ESC)',
          'Vehicle Stability Management (VSM)',
          'Hill Assist Control (HAC)',
          'ABS with EBD',
          'Rear Parking Sensors',
          'Rear View Camera with Dynamic Guidelines',
          'Tyre Pressure Monitoring System (Highline TPMS)',
          'Rear Defogger & Rear Wiper Washer',
          'Electrochromic Auto-Dimming IRVM'
        ],
        comfort: [
          'Electric Single-Pane Sunroof',
          'Automatic Climate Control (FATC) with Digital Display',
          'Rear AC Vents',
          'Driver Seat Height Adjustment',
          'Leatherette Door Armrest & Gear Knob',
          'Front Center Sliding Armrest with Storage',
          'Soothing Blue Ambient Lighting',
          'Tilt & Telescopic Steering Column'
        ],
        infotainment: [
          '10.25-inch High-Definition Touchscreen Navigation System',
          'Bose Premium 7-Speaker Sound System with Subwoofer',
          'Hyundai Bluelink Connected Car Suite (60+ Connected Features)',
          'Wireless Apple CarPlay & Android Auto',
          'Wireless Smartphone Charging Pad',
          'Digital Instrument Cockpit'
        ],
        convenience: [
          'Push Button Engine Start/Stop with Smart Key',
          'Cruise Control',
          'Electrically Foldable Auto-Folding ORVMs',
          'Puddle Lamps with Welcome Lights',
          'Auto-Headlamps with Follow-Me-Home'
        ],
        exterior: [
          'Full LED Multi-Reflector Headlamps with LED DRLs',
          'Signature Z-Shaped Connected LED Tail Lamps',
          '16-inch Diamond-Cut Dual-Tone Alloy Wheels',
          'Chrome Door Handles & Window Beltline'
        ],
        performance: [
          'Idle Stop & Go (ISG)',
          'Electric Power Steering'
        ]
      }
    }
  ],

  // 8. Mahindra XUV 3XO
  'XUV 3XO': [
    {
      name: 'MX1',
      priceApprox: '₹ 7.79 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Program (ESP)',
          'All 4 Disc Brakes',
          'ISOFIX Child Seat Mounts',
          'Rear Parking Sensors',
          'Seatbelt Reminder for All Occupants'
        ],
        comfort: [
          'Front & Rear Power Windows',
          'Front Center Armrest with Storage',
          'Manual Air Conditioning with Heater',
          'Front 12V Power Outlet',
          '60:40 Split Folding Rear Seats'
        ],
        infotainment: [
          'Digital Instrument Cluster',
          'Type-C Front Fast Charger'
        ],
        convenience: [
          'Central Locking',
          'Electrically Adjustable ORVMs',
          'Engine Start-Stop Push Button'
        ],
        exterior: [
          'Bi-Halogen Projector Headlamps',
          'LED High Mount Stop Lamp',
          '16-inch Steel Wheels'
        ],
        performance: [
          'Smart Steering Modes (Comfort, Normal, Sport)'
        ]
      }
    },
    {
      name: 'MX2 Pro',
      priceApprox: '₹ 8.99 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Program (ESP)',
          'All 4 Disc Brakes',
          'ISOFIX Child Seat Mounts',
          'Rear Parking Sensors'
        ],
        comfort: [
          'Single-Pane Electric Sunroof',
          'Front & Rear Power Windows',
          'Front Center Armrest with Storage',
          'Manual Air Conditioning with Heater',
          '60:40 Split Folding Rear Seats'
        ],
        infotainment: [
          '10.25-inch Touchscreen Infotainment System',
          'Wireless Android Auto & Wired Apple CarPlay',
          '4-Speaker Sound System',
          'Steering-Mounted Audio Controls'
        ],
        convenience: [
          'Remote Keyless Entry',
          'Electrically Adjustable ORVMs',
          'Follow-Me-Home Headlamps'
        ],
        exterior: [
          'Wheel Covers',
          'Bi-Halogen Projector Headlamps',
          'Roof Rails'
        ],
        performance: [
          'Smart Steering Modes (Comfort, Normal, Sport)'
        ]
      }
    },
    {
      name: 'MX3',
      priceApprox: '₹ 9.49 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Program (ESP)',
          'All 4 Disc Brakes',
          'ISOFIX Child Seat Mounts',
          'Rear Parking Sensors',
          'Reverse Parking Camera with Guidelines'
        ],
        comfort: [
          'Single-Pane Electric Sunroof',
          'Front & Rear Power Windows',
          'Front Center Armrest with Storage',
          'Rear Seat Center Armrest with Cup Holders',
          '60:40 Split Folding Rear Seats'
        ],
        infotainment: [
          '10.25-inch HD Touchscreen Infotainment',
          'Wireless Apple CarPlay & Android Auto',
          '4-Speaker Audio System',
          'Steering-Mounted Audio & Calling Controls'
        ],
        convenience: [
          'Cruise Control',
          'Drive Modes (Zip, Zap, Zoom on Petrol Automatic)',
          'Remote Keyless Entry',
          'Electrically Foldable ORVMs'
        ],
        exterior: [
          'Wheel Covers',
          'LED Daytime Running Lights (DRLs)',
          'Connected Infinity LED Tail Lamps',
          'Roof Rails'
        ],
        performance: [
          'Smart Steering Modes (Comfort, Normal, Sport)'
        ]
      }
    },
    {
      name: 'AX5',
      priceApprox: '₹ 10.69 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Program (ESP)',
          'All 4 Disc Brakes',
          'Tyre Pressure Monitoring System (TPMS)',
          'Reverse Parking Camera',
          'Rear Window Defogger & Wiper-Washer'
        ],
        comfort: [
          'Dual-Zone Automatic Climate Control (FATC)',
          'Single-Pane Electric Sunroof',
          'Rear AC Vents',
          'Height Adjustable Driver Seat',
          'Rear Center Armrest with Cup Holders'
        ],
        infotainment: [
          'Twin HD 10.25-inch Screens (Infotainment + Digital Cluster)',
          '10.25-inch Full Digital Driver Cockpit Screen',
          'AdrenoX Connect Connected Car Suite (80+ Features)',
          '6-Speaker Audio System',
          'Wireless Smartphone Charger'
        ],
        convenience: [
          'Push Button Start/Stop with Smart Key',
          'Cruise Control',
          'Auto Headlamps',
          'Rain-Sensing Auto Wipers'
        ],
        exterior: [
          '16-inch Diamond Cut Alloy Wheels',
          'Full LED Projector Headlamps with DRLs',
          'Infinity Connected LED Taillamps',
          'Roof Rails'
        ],
        performance: [
          'Smart Steering Modes (Comfort, Normal, Sport)',
          'Drive Modes (Zip, Zap, Zoom)'
        ]
      }
    },
    {
      name: 'AX7',
      priceApprox: '₹ 12.49 Lakh',
      isTopModel: false,
      features: {
        safety: [
          '5-Star Bharat NCAP Safety Rating',
          '6 Airbags (Standard across all trims)',
          'Electronic Stability Program (ESP)',
          'All 4 Disc Brakes',
          'Front & Rear Parking Sensors',
          '360-Degree Surround Camera with Blind View Monitor',
          'Tyre Pressure Monitoring System (TPMS)'
        ],
        comfort: [
          'Panoramic Skyroof (Largest in Segment)',
          'Dual-Zone Automatic Climate Control',
          'Leatherette Dashboard & Soft Touch Door Trims',
          'Leatherette Seat Upholstery',
          'Rear AC Vents',
          'Height Adjustable Driver Seat'
        ],
        infotainment: [
          'Twin HD 10.25-inch Screens (Infotainment + Digital Cluster)',
          'Harman Kardon Premium 7-Speaker Sound System with Subwoofer',
          'AdrenoX Connect with Built-in Alexa',
          'Wireless Android Auto & Apple CarPlay',
          'Wireless Smartphone Charger'
        ],
        convenience: [
          'Push Button Start/Stop with Smart Key',
          'Electronic Parking Brake with Auto Hold',
          'Cruise Control',
          'Auto-Dimming Inside Rear View Mirror (IRVM)',
          'Cooled Glove Box with Illumination'
        ],
        exterior: [
          '17-inch Diamond-Cut Alloy Wheels',
          'Full LED Headlamps with Signature LED DRLs',
          'Infinity Connected LED Taillamps',
          'LED Front Fog Lamps with Cornering Function'
        ],
        performance: [
          'Smart Steering Modes (Comfort, Normal, Sport)',
          'Drive Modes (Zip, Zap, Zoom)'
        ]
      }
    },
    {
      name: 'AX7L',
      priceApprox: '₹ 15.49 Lakh',
      isTopModel: true,
      features: {
        safety: [
          '5-Star Bharat NCAP Safety Rating',
          'Level 2 ADAS (10 Active Autonomous Safety Features)',
          'Forward Collision Warning & Auto Emergency Braking (AEB)',
          'Adaptive Cruise Control with Stop & Go',
          'Lane Keep Assist & Lane Departure Warning',
          'Smart Pilot Assist (Steering & Throttle Assist)',
          'High Beam Assist & Traffic Sign Recognition',
          '6 Airbags (Standard across all trims)',
          '360-Degree Surround Camera with 3D Blind View Monitor',
          'Electronic Stability Program (ESP)',
          'All 4 Disc Brakes',
          'Front & Rear Parking Sensors',
          'Electronic Parking Brake (EPB) with Auto-Hold'
        ],
        comfort: [
          'Panoramic Skyroof (Largest in Segment with One-Touch Control)',
          'Dual-Zone Automatic Climate Control (FATC)',
          '65W USB-C Fast Laptop Charging Socket',
          'Premium White Leatherette Seat Upholstery',
          'Leatherette Dashboard & Door Padding with Contrast Stitching',
          'Rear AC Vents',
          'Height-Adjustable Driver Seat with Lumbar Support',
          '60:40 Split Folding Rear Seat'
        ],
        infotainment: [
          'Twin HD 10.25-inch Floating Screens (Infotainment + Digital Cluster)',
          'Harman Kardon Cinematic 7-Speaker Audio System with Bass Subwoofer & DSP',
          'AdrenoX Connect with Built-in Alexa & 80+ Connected Features',
          'Wireless Android Auto & Apple CarPlay',
          'Fast Wireless Smartphone Charging Pad with Active Cooling'
        ],
        convenience: [
          'Push Button Start/Stop with Smart Key',
          'Auto-Dimming Frameless Inside Rearview Mirror (IRVM)',
          'Rain-Sensing Automatic Front Wipers',
          'Auto-Headlamps with Follow-Me-Home & Lead-Me-To-Car',
          'Electrically Foldable & Heated ORVMs',
          'Cooled Glove Box with Illumination'
        ],
        exterior: [
          '17-inch Diamond-Cut Aerodynamic Alloy Wheels',
          'Full LED Projector Headlamps with Signature DRL Light Bars',
          'Infinity Connected LED Taillamps with Dynamic Welcome Sequence',
          'LED Front Fog Lamps with Cornering Function',
          'Piano Black Roof Rails & Shark Fin Antenna'
        ],
        performance: [
          'Smart Steering Modes (Comfort, Normal, Sport)',
          'Segment-Leading 129 bhp mStallion TGDi Turbo Petrol Engine',
          'Drive Modes (Zip, Zap, Zoom on AT)',
          'Paddle Shifters for AISIN 6-Speed Automatic'
        ]
      }
    }
  ]
};

module.exports = { TRIM_VARIANTS_DATA };
