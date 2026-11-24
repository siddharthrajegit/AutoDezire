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
  ],
  "X1": [
    {
      "name": "sDrive18i M Sport",
      "priceApprox": "₹ 49.50 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "6 Airbags",
          "Dynamic Stability Control",
          "Parking Assistant with Reversing Assistant",
          "Attentiveness Assistant"
        ],
        "comfort": [
          "BMW Curved Display (10.25-inch + 10.7-inch)",
          "Sport Seats with Alcantara Upholstery",
          "Dual-Zone Automatic Climate Control",
          "Panoramic Glass Sunroof"
        ],
        "infotainment": [
          "BMW Operating System 8",
          "Wireless Apple CarPlay & Android Auto",
          "BMW Live Cockpit Plus",
          "Hi-Fi Loudspeaker Sound"
        ],
        "convenience": [
          "Comfort Access Keyless Entry",
          "Automatic Powered Tailgate",
          "Wireless Device Charging",
          "Rain-Sensing Automatic Wipers"
        ],
        "exterior": [
          "M Sport Exterior Aerodynamic Package",
          "18-inch M Double-Spoke Light Alloy Wheels",
          "Adaptive LED Headlights with High Beam Assist"
        ],
        "performance": [
          "1.5L TwinPower Turbo Petrol (134 bhp)",
          "7-Speed Dual-Clutch Steptronic",
          "Brake Energy Regeneration"
        ]
      }
    },
    {
      "name": "sDrive18d M Sport",
      "priceApprox": "₹ 52.70 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "6 Airbags",
          "Cornering Brake Control",
          "Front Collision Warning with Brake Intervention",
          "ISOFIX Child Seat Mounts"
        ],
        "comfort": [
          "Sport Seats with Memory Function",
          "M Leather Multi-Function Steering Wheel",
          "Ambient Interior Lighting with 6 Colour Profiles",
          "Panoramic Glass Roof"
        ],
        "infotainment": [
          "Harman Kardon Premium Surround Sound System",
          "BMW Intelligent Personal Voice Assistant",
          "BMW ConnectedDrive Services"
        ],
        "convenience": [
          "Hands-Free Smart Tailgate Opening",
          "Active Auto Park Distance Control",
          "Electrochromic Auto-Dimming Mirrors"
        ],
        "exterior": [
          "High-Gloss Shadowline Exterior Trim",
          "Roof Rails in High-Gloss Black",
          "M Sport Badging on Front Wings"
        ],
        "performance": [
          "2.0L TwinPower Turbo Diesel (148 bhp / 360 Nm)",
          "7-Speed Steptronic DCT",
          "Steering Column Paddle Shifters"
        ]
      }
    }
  ],
  "3 Series Gran Limousine": [
    {
      "name": "330Li M Sport",
      "priceApprox": "₹ 60.60 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "6 Airbags",
          "Cornering Brake Control (CBC)",
          "Dynamic Stability Control (DSC)",
          "Run-Flat Tyres with Tyre Pressure Indicator"
        ],
        "comfort": [
          "Extended 2961mm Limousine Wheelbase",
          "Vernasca Leather Upholstery with M Stitching",
          "Rear Seat Lounge Comfort Headrest Pillows",
          "3-Zone Climate Control"
        ],
        "infotainment": [
          "BMW Curved Display (12.3-inch + 14.9-inch)",
          "16-Speaker Harman Kardon 464W Surround Sound",
          "Wireless Smartphone Integration"
        ],
        "convenience": [
          "BMW Digital Key Plus",
          "Panoramic Electric Sunroof",
          "Automated Parking Assistant with 50m Reversing Memory"
        ],
        "exterior": [
          "18-inch M Double-Spoke Bicolour Alloys",
          "M Aerodynamic Kit",
          "Gloss Black Kidney Grille and Window Surrounds"
        ],
        "performance": [
          "2.0L TwinPower Turbo Petrol (258 bhp / 400 Nm)",
          "0-100 km/h in 6.2 Seconds",
          "8-Speed Steptronic Sport with Launch Control",
          "Rear-Wheel Drive Dynamics"
        ]
      }
    },
    {
      "name": "320Ld M Sport",
      "priceApprox": "₹ 62.00 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "6 Airbags",
          "Side Impact Protection",
          "Dynamic Traction Control (DTC)",
          "Front Collision Alert with City Braking"
        ],
        "comfort": [
          "Extra 110mm Rear Knee Room",
          "Roller Sunblinds for Rear Door Windows",
          "Acoustic Glazing for Windscreen and Side Windows",
          "Illuminated M Door Sills"
        ],
        "infotainment": [
          "BMW Curved Display with iDrive 8",
          "Connected Package Professional with Real-Time Traffic",
          "Wireless Phone Charging Tray"
        ],
        "convenience": [
          "Comfort Access Keyless System",
          "Hands-Free Gesture-Controlled Boot Release",
          "Electronic Parking Brake with Auto-Hold"
        ],
        "exterior": [
          "Adaptive LED Headlights with Blue Accents",
          "M Sport Exhaust Finisher",
          "Anthracite Headliner"
        ],
        "performance": [
          "2.0L 4-Cylinder Turbo Diesel (190 bhp / 400 Nm)",
          "19.61 kmpl Highway Fuel Economy",
          "8-Speed Steptronic Transmission with RWD"
        ]
      }
    }
  ],
  "X3": [
    {
      "name": "xDrive20d M Sport",
      "priceApprox": "₹ 68.50 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "6 Airbags",
          "BMW xDrive Permanent All-Wheel Drive",
          "Hill Descent Control",
          "Cornering Brake Control"
        ],
        "comfort": [
          "Sensatec Perforated Sports Upholstery",
          "Panoramic Glass Sunroof",
          "3-Zone Automatic Climate Control",
          "550L Cargo Boot"
        ],
        "infotainment": [
          "12.3-inch Touchscreen Navigation",
          "BMW Live Cockpit Professional",
          "HiFi Loudspeaker Audio System"
        ],
        "convenience": [
          "Parking Assistant Plus with Surround View Camera",
          "Powered Tailgate Operation",
          "Wireless Smartphone Charging"
        ],
        "exterior": [
          "19-inch M Light Alloy Wheels",
          "Adaptive LED Headlights",
          "M High-Gloss Shadowline Trim",
          "204mm Ground Clearance"
        ],
        "performance": [
          "2.0L 4-Cylinder Turbo Diesel (188 bhp / 400 Nm)",
          "8-Speed Steptronic Automatic",
          "xDrive Torque Vectoring"
        ]
      }
    },
    {
      "name": "xDrive30i M Sport",
      "priceApprox": "₹ 74.90 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "6 Airbags",
          "Attentiveness Assistant",
          "Crash Sensor and Dynamic Braking Lights",
          "Tyre Pressure Monitoring"
        ],
        "comfort": [
          "Vernasca Leather Sports Seats with Lumbar Adjustment",
          "Adaptive Suspension Dampers",
          "Acoustic Glass Windows"
        ],
        "infotainment": [
          "Harman Kardon 16-Speaker 600W Sound System",
          "BMW Gesture Control",
          "Head-Up Display"
        ],
        "convenience": [
          "Comfort Access Entry",
          "Drive Recorder Dashcam Capability",
          "Remote Engine Start via Key"
        ],
        "exterior": [
          "M Sport Aerodynamic Package with Diffuser",
          "Blue M Sport Brake Calipers",
          "Aluminium Roof Rails"
        ],
        "performance": [
          "2.0L TwinPower Turbo Petrol (248 bhp / 350 Nm)",
          "0-100 km/h in 6.6 Seconds",
          "M Sport Differential and Launch Control"
        ]
      }
    }
  ],
  "iX1": [
    {
      "name": "xDrive30 M Sport",
      "priceApprox": "₹ 66.90 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "6 Airbags",
          "Pedestrian Acoustic Protection",
          "Lane Departure Warning with Steering Return",
          "Electronic Stability Control with AWD Vectoring"
        ],
        "comfort": [
          "Sport Seats with Massage Function",
          "Panoramic Sunroof",
          "Adaptive M Suspension",
          "Dual-Zone Automatic Climate Control"
        ],
        "infotainment": [
          "BMW Curved Display (10.25-inch + 10.7-inch)",
          "Harman Kardon Surround Sound System",
          "BMW IconicSounds Electric Sound Generator"
        ],
        "convenience": [
          "130 kW DC Fast Charging Capability",
          "BMW Wallbox 11kW AC Charger Included",
          "Parking Assistant Plus with 360-degree Cameras"
        ],
        "exterior": [
          "M Sport Exterior Package with Blue Accents",
          "18-inch Aerodynamic Alloy Wheels",
          "Flush Integrated Door Handles"
        ],
        "performance": [
          "Dual Motor Electric AWD (308 bhp / 494 Nm)",
          "0-100 km/h in 5.6 Seconds",
          "66.4 kWh High-Voltage Battery with 440 km Range"
        ]
      }
    }
  ],
  "GLA": [
    {
      "name": "GLA 200",
      "priceApprox": "₹ 51.75 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "7 Airbags including Driver Knee Airbag",
          "Active Brake Assist",
          "Pre-Safe Predictive Safety System",
          "Blind Spot Assist"
        ],
        "comfort": [
          "Twin 10.25-inch MBUX Digital Cockpit",
          "Artico Leatherette / Microfiber Upholstery",
          "64-Colour Ambient Lighting",
          "Panoramic Sliding Sunroof"
        ],
        "infotainment": [
          "MBUX Infotainment with 'Hey Mercedes' Voice Control",
          "Wireless Smartphone Integration (Apple CarPlay / Android Auto)",
          "Mercedes-Me Connected Car Suite"
        ],
        "convenience": [
          "Easy-Pack Powered Tailgate",
          "Parktronic Active Parking Assist with Reversing Camera",
          "Keyless-Go Start/Stop"
        ],
        "exterior": [
          "LED High Performance Headlights",
          "18-inch 5-Twin-Spoke Alloy Wheels",
          "Aluminium Roof Rails"
        ],
        "performance": [
          "1.3L 4-Cylinder Turbo Petrol (161 bhp / 250 Nm)",
          "7G-DCT Dual-Clutch Automatic (FWD)",
          "Dynamic Select Drive Modes"
        ]
      }
    },
    {
      "name": "GLA 220d 4MATIC",
      "priceApprox": "₹ 58.15 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "7 Airbags",
          "4MATIC Permanent All-Wheel Drive",
          "Downhill Speed Regulation (DSR)",
          "Tyre Pressure Loss Warning"
        ],
        "comfort": [
          "Memory Front Seats with 4-Way Lumbar Support",
          "Turbine Air Vents with Ambient Backlight",
          "Comfort Suspension for Indian Roads"
        ],
        "infotainment": [
          "Advanced Sound System with 10 Speakers and 225W Output",
          "Augmented Reality Video Navigation",
          "Wireless Phone Charging"
        ],
        "convenience": [
          "Hands-Free Access Boot Opening",
          "Mirror Package with Auto-Dimming and Heated Mirrors",
          "Rain-Sensing Auto Wipers"
        ],
        "exterior": [
          "AMG Line Front Apron with Chrome Diamond Grille",
          "19-inch AMG 5-Spoke Alloy Wheels",
          "Dark Tinted Privacy Glass"
        ],
        "performance": [
          "2.0L 4-Cylinder Turbo Diesel (188 bhp / 400 Nm)",
          "8G-DCT Dual-Clutch Transmission",
          "0-100 km/h in 7.3 Seconds"
        ]
      }
    }
  ],
  "C-Class": [
    {
      "name": "C 200",
      "priceApprox": "₹ 61.85 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "7 Airbags",
          "Active Brake Assist",
          "Pedestrian Protection with Active Bonnet",
          "Pre-Safe System"
        ],
        "comfort": [
          "11.9-inch Portrait Central Touchscreen",
          "12.3-inch High-Resolution Digital Driver Display",
          "64-Colour Ambient Lighting",
          "Memory Package for Seats"
        ],
        "infotainment": [
          "Second-Generation MBUX with Biometric Fingerprint Scanner",
          "Wireless Apple CarPlay and Android Auto",
          "3D Sound System"
        ],
        "convenience": [
          "Keyless-Go Package",
          "Panoramic Glass Sliding Roof",
          "Remote Boot Lid Closing"
        ],
        "exterior": [
          "LED High Performance Headlamps",
          "17-inch 5-Spoke Aerodynamic Alloy Wheels",
          "Chrome Exterior Trim Package"
        ],
        "performance": [
          "1.5L Turbo Petrol + 48V Integrated Starter Generator (201 bhp / 300 Nm)",
          "9G-Tronic 9-Speed Automatic Transmission",
          "Agility Control Suspension"
        ]
      }
    },
    {
      "name": "C 220d",
      "priceApprox": "₹ 63.85 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "7 Airbags",
          "Active Distance Assist Distronic",
          "Blind Spot Assist with Exit Warning",
          "Emergency Call System"
        ],
        "comfort": [
          "Sienna Brown / Black Artico Leather Interior",
          "Front Seat Ventilation and Seat Heating",
          "Dual-Zone Thermatic Climate Control"
        ],
        "infotainment": [
          "Burmester 3D Surround Sound System with 15 Speakers (710W)",
          "MBUX Navigation Premium with Live Traffic",
          "Wireless Charging Pad"
        ],
        "convenience": [
          "Hands-Free Access Foot-Gesture Boot Release",
          "360-Degree Parking Camera System",
          "Auto-Dimming Frameless Rearview Mirror"
        ],
        "exterior": [
          "Digital Light Headlamps with 1.3-Million Micro-Mirrors",
          "18-inch Multi-Spoke AMG Line Alloys",
          "Twin Exhaust Tailpipes"
        ],
        "performance": [
          "2.0L Turbo Diesel + 48V Mild Hybrid (197 bhp / 440 Nm)",
          "23.0 kmpl Highway Fuel Economy",
          "0-100 km/h in 7.3 Seconds"
        ]
      }
    }
  ],
  "GLC": [
    {
      "name": "GLC 300 4MATIC",
      "priceApprox": "₹ 75.90 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "9 Airbags including Center Airbag",
          "Active Lane Keeping Assist",
          "Pre-Safe Impulse Side",
          "Off-Road ABS with Hill Descent Control"
        ],
        "comfort": [
          "620L Cavernous Boot Space",
          "11.9-inch Waterfall Portrait Display",
          "Acoustic Comfort Package with Dual-Glazed Glass",
          "Panoramic Sunroof"
        ],
        "infotainment": [
          "Burmester 3D Surround Audio (15 Speakers / 710W)",
          "MBUX Interior Assistant with Gesture Control",
          "Wireless Smartphone Integration"
        ],
        "convenience": [
          "Virtual Transparent Bonnet View via 360 Camera",
          "Hands-Free Tailgate Access",
          "Memory Package for Front Seats and Steering"
        ],
        "exterior": [
          "Digital Light Headlamps with Projection Functions",
          "19-inch 10-Spoke Light Alloy Wheels",
          "Polished Aluminium Roof Rails",
          "187mm Ground Clearance"
        ],
        "performance": [
          "2.0L Turbo Petrol + 48V ISG (254 bhp / 400 Nm)",
          "9G-Tronic Automatic (4MATIC AWD)",
          "0-100 km/h in 6.2 Seconds"
        ]
      }
    },
    {
      "name": "GLC 220d 4MATIC",
      "priceApprox": "₹ 77.90 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "9 Airbags",
          "Blind Spot Assist",
          "Active Brake Assist with Cross-Traffic Detection",
          "Tyre Pressure Monitoring System"
        ],
        "comfort": [
          "Nappa Leather Sports Steering Wheel",
          "Heated and Ventilated Front Seats",
          "Thermotronic 3-Zone Climate Control"
        ],
        "infotainment": [
          "MBUX Augmented Reality Navigation",
          "Connected Car Services via Smartphone App",
          "Biometric Authentication"
        ],
        "convenience": [
          "Easy-Pack Load Compartment Cover and Luggage Net",
          "Keyless-Go with Flush Door Handles",
          "Ambient Lighting with Dynamic Sound Visualizer"
        ],
        "exterior": [
          "AMG Line Aerodynamics with Star Pattern Radiator Grille",
          "20-inch AMG Multi-Spoke Bicolour Alloys",
          "Running Boards in Aluminium Look"
        ],
        "performance": [
          "2.0L Turbo Diesel + 48V ISG (194 bhp / 440 Nm)",
          "19.4 kmpl Highway Fuel Economy",
          "4MATIC Permanent All-Wheel Drive"
        ]
      }
    }
  ],
  "A4": [
    {
      "name": "40 TFSI Premium",
      "priceApprox": "₹ 46.88 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "6 Airbags",
          "Electronic Stability Control (ESC)",
          "Audi Pre-Sense Basic",
          "Auto-Hold Assist"
        ],
        "comfort": [
          "Leatherette Upholstery",
          "3-Zone Deluxe Automatic Air Conditioning",
          "Sunroof with Tinted Glass",
          "Five-Link Comfort Suspension"
        ],
        "infotainment": [
          "10.1-inch MMI Touchscreen Infotainment",
          "Audi Sound System with 10 Speakers and Subwoofer",
          "Apple CarPlay & Android Auto"
        ],
        "convenience": [
          "Electrically Adjustable Front Seats with Driver Memory",
          "Audi Parking System Plus (Front & Rear Sensors with Camera)",
          "Cruise Control with Speed Limiter"
        ],
        "exterior": [
          "LED Headlights with Dynamic Rear Indicators",
          "17-inch 5-Arm Dynamic Style Alloy Wheels",
          "Singleframe Chrome Radiator Grille"
        ],
        "performance": [
          "2.0L 4-Cylinder TFSI Turbo Petrol (204 bhp / 320 Nm)",
          "7-Speed S-Tronic Dual Clutch (FWD)",
          "0-100 km/h in 7.1 Seconds"
        ]
      }
    },
    {
      "name": "40 TFSI Technology",
      "priceApprox": "₹ 55.83 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "8 Airbags (including Rear Side Airbags)",
          "Tyre Pressure Monitor",
          "Audi Pre-Sense City with Emergency Brake Intervention"
        ],
        "comfort": [
          "Piano Black Inlays with Contour Ambient Lighting (30 Colours)",
          "Comfort Center Armrest with Storage",
          "Comfort Keyless Access with Foot-Gesture Boot Open"
        ],
        "infotainment": [
          "Audi Virtual Cockpit Plus (12.3-inch Full Digital Cluster)",
          "Audi Phone Box with Wireless Inductive Charging and Signal Booster",
          "MMI Navigation Plus"
        ],
        "convenience": [
          "Park Assist with Automated Steering",
          "Frameless Auto-Dimming Interior Mirror",
          "Electronic Child Safety Locks"
        ],
        "exterior": [
          "Matrix LED Headlights with Dynamic Turn Signals",
          "17-inch Cast Aluminium Multi-Spoke Wheels",
          "High-Gloss Styling Package"
        ],
        "performance": [
          "2.0L TFSI Turbocharged Engine with Mild-Hybrid 12V Tech",
          "17.4 kmpl Fuel Economy",
          "Audi Drive Select (Comfort, Auto, Dynamic, Individual)"
        ]
      }
    }
  ],
  "Q3": [
    {
      "name": "40 TFSI Quattro Premium Plus",
      "priceApprox": "₹ 51.99 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "6 Airbags",
          "Quattro Permanent All-Wheel Drive",
          "Electronic Stability Program (ESP)",
          "Hill Descent Assist"
        ],
        "comfort": [
          "Panoramic Glass Sunroof",
          "2-Zone Deluxe Automatic Climate Control",
          "Leather / Leatherette Combination Upholstery",
          "Sliding Rear Seat Bench"
        ],
        "infotainment": [
          "10.1-inch MMI Touch Display",
          "Audi Sound System (10 Speakers)",
          "Audi Smartphone Interface"
        ],
        "convenience": [
          "Electrically Adjustable Front Seats with 4-Way Lumbar Support",
          "Rear View Camera with Parking Aid Plus",
          "Luggage Compartment Package (530L Boot)"
        ],
        "exterior": [
          "LED Headlights with LED Rear Combination Lamps",
          "18-inch 5-Arm Style Alloy Wheels",
          "Aluminium Roof Rails"
        ],
        "performance": [
          "2.0L TFSI Turbo Petrol (190 bhp / 320 Nm)",
          "7-Speed S-Tronic Dual Clutch with Quattro AWD",
          "0-100 km/h in 7.3 Seconds"
        ]
      }
    },
    {
      "name": "40 TFSI Quattro Technology",
      "priceApprox": "₹ 55.99 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "6 Airbags",
          "Audi Pre-Sense Front",
          "Speed Warning System",
          "ISOFIX Child Anchorage Points"
        ],
        "comfort": [
          "Contour Ambient Lighting Package (30 Colours)",
          "Aluminium Look Interior Trim Elements",
          "Wireless Phone Charging Pad with Antenna Coupling"
        ],
        "infotainment": [
          "Audi Virtual Cockpit Plus (12.3-inch Display)",
          "Audi Sound System with Subwoofer",
          "Navigation System with 3D City Maps"
        ],
        "convenience": [
          "Comfort Key with Sensor-Controlled Powered Tailgate Release",
          "Auto-Dimming Frameless Interior Mirror",
          "Audi Drive Select"
        ],
        "exterior": [
          "Matrix LED Headlights with Dynamic Headlight Range Control",
          "18-inch 5-Spoke V-Style Contrast Grey Alloys",
          "Singleframe Octagonal Grille"
        ],
        "performance": [
          "2.0L TFSI Turbocharged Petrol Engine",
          "Quattro Intelligent AWD",
          "Progressive Steering for Sharp Handling"
        ]
      }
    }
  ],
  "Q5": [
    {
      "name": "45 TFSI Quattro Premium Plus",
      "priceApprox": "₹ 65.55 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "8 Airbags",
          "Quattro Ultra All-Wheel Drive",
          "Audi Pre-Sense Basic & Rear",
          "Hill Hold & Hill Descent Control"
        ],
        "comfort": [
          "Adaptive Damper Suspension",
          "Leather / Leatherette Combination Upholstery",
          "Panoramic Sunroof",
          "3-Zone Climate Control"
        ],
        "infotainment": [
          "10.1-inch MMI Touch Screen with MMI Navigation",
          "Audi Sound System with 10 Speakers",
          "Audi Virtual Cockpit Plus"
        ],
        "convenience": [
          "Comfort Key with Motion-Sensing Tailgate",
          "Cruise Control with Speed Limiter",
          "Park Assist Plus with Rear Camera"
        ],
        "exterior": [
          "LED Headlamps with Dynamic Turn Signals",
          "19-inch 5-Double-Spoke Style Alloy Wheels",
          "200mm High Ground Clearance"
        ],
        "performance": [
          "2.0L High-Output TFSI Turbo Petrol (245 bhp / 370 Nm)",
          "7-Speed S-Tronic DCT",
          "0-100 km/h in 6.3 Seconds"
        ]
      }
    },
    {
      "name": "45 TFSI Quattro Technology",
      "priceApprox": "₹ 70.73 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "8 Airbags",
          "Tyre Pressure Monitoring System (TPMS)",
          "Sideguard Head Airbag System",
          "Emergency Braking Assist"
        ],
        "comfort": [
          "Driver Seat Memory Function",
          "Contour Ambient Lighting Package (30 Colours)",
          "Piano Black Gloss Inlays",
          "Rear Seat Reclining & Sliding Adjust"
        ],
        "infotainment": [
          "Bang & Olufsen 3D Premium Sound System (19 Speakers / 755W)",
          "Audi Phone Box with Wireless Charging",
          "Audi Smartphone Interface"
        ],
        "convenience": [
          "Sensor-Controlled Electronic Tailgate",
          "Park Assist with Automated Perpendicular & Parallel Parking",
          "Electrically Folding Auto-Dimming Door Mirrors"
        ],
        "exterior": [
          "Matrix LED Headlights with OLED Taillight Technology",
          "19-inch 5-Arm Pylon Style Graphite Grey Alloys",
          "Aluminium Exterior Styling Package"
        ],
        "performance": [
          "2.0L TFSI 245 bhp High-Output Engine",
          "Quattro Ultra AWD with Dynamic Torque Distribution",
          "Top Speed of 237 km/h"
        ]
      }
    }
  ],
  "Kodiaq": [
    {
      "name": "2.0 TSI Style",
      "priceApprox": "₹ 39.99 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "9 Airbags",
          "Electronic Stability Control (ESC)",
          "Multi-Collision Brake (MKB)",
          "Fatigue Detection Driver Alertness System"
        ],
        "comfort": [
          "7-Seater Configuration with Sliding Middle Row",
          "Panoramic Sunroof with Bounce-Back Protection",
          "3-Zone Climatronic AC with Air Care",
          "Leatherette Upholstery"
        ],
        "infotainment": [
          "8-inch Infotainment Display with Wireless SmartLink",
          "Virtual Cockpit with 10.25-inch Display",
          "Skoda Audio System with 8 Speakers"
        ],
        "convenience": [
          "Keyless Entry and Push Button Start (KESSY)",
          "Electrically Adjustable Driver Seat with Memory",
          "Cruise Control"
        ],
        "exterior": [
          "Full LED Headlights with AFS",
          "18-inch Trinity Alloy Wheels",
          "Black Roof Rails",
          "192mm Ground Clearance"
        ],
        "performance": [
          "2.0L TSI Turbo Petrol (190 bhp / 320 Nm)",
          "7-Speed DSG Dual-Clutch with 4x4",
          "Drive Mode Select"
        ]
      }
    },
    {
      "name": "2.0 TSI L&K 4x4",
      "priceApprox": "₹ 46.99 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "9 Airbags",
          "Dynamic Chassis Control (DCC) with Adaptive Shock Absorbers",
          "360-Degree Area View Camera",
          "Tyre Pressure Monitoring"
        ],
        "comfort": [
          "Laurin & Klement Perforated Leather Seats with Ventilation and Heating",
          "Acoustic Side Windows",
          "Virtual Pedal Hands-Free Tailgate",
          "Power 12-Way Front Seats"
        ],
        "infotainment": [
          "Canton 625W 12-Speaker Sound System with Subwoofer",
          "10.25-inch Digital Virtual Cockpit",
          "Wireless Phone Charging Pad"
        ],
        "convenience": [
          "Roll-Up Sunshades for Rear Windows",
          "Door-Edge Protective Strips",
          "Umbrella Storage Compartments in Front Doors"
        ],
        "exterior": [
          "Chrome Grille with L&K Chrome Badging",
          "18-inch Soira Dual-Tone Anthracite Alloys",
          "Silver Roof Rails"
        ],
        "performance": [
          "Dynamic Chassis Control (Adaptive Dampers)",
          "4x4 with Electronic Differential Lock (EDL)",
          "Off-Road Traction Mode"
        ]
      }
    }
  ],
  "Seal": [
    {
      "name": "Dynamic RWD",
      "priceApprox": "₹ 41.00 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "9 Airbags",
          "Level 2 ADAS Suite (Automatic Emergency Braking, Lane Keep Assist)",
          "5-Star Euro NCAP & ANCAP"
        ],
        "comfort": [
          "15.6-inch Rotatable Touchscreen Display",
          "Panoramic Glass Roof with UV Coating",
          "Dual-Zone Heat Pump Air Conditioning"
        ],
        "infotainment": [
          "Dynaudio 12-Speaker Sound System",
          "BYD DiLink Intelligent Connected System",
          "Voice Recognition with 4-Zone Microphones"
        ],
        "convenience": [
          "NFC Key Card and Smartphone Bluetooth Digital Key",
          "Vehicle-to-Load (V2L) External Power Supply",
          "360-Degree Holographic Camera"
        ],
        "exterior": [
          "Crystal LED Headlights with Ocean Wave DRLs",
          "19-inch Aerodynamic Alloy Wheels",
          "Retractable Flush Door Handles"
        ],
        "performance": [
          "61.44 kWh Blade Battery (201 bhp / 310 Nm)",
          "510 km Range (ARAI)",
          "Rear-Wheel Drive (0-100: 7.5s)"
        ]
      }
    },
    {
      "name": "Performance AWD",
      "priceApprox": "₹ 53.65 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "9 Airbags",
          "Intelligent Torque Adaptation Control (iTAC)",
          "Driver Attention Warning",
          "Blind Spot Detection with Door Open Warning"
        ],
        "comfort": [
          "Ventilated and Heated Front Sport Seats",
          "Head-Up Display (W-HUD)",
          "Cell-to-Body (CTB) Ultra-Rigid Structure (40,500 Nm/deg)"
        ],
        "infotainment": [
          "Dynaudio Premium Surround Audio System",
          "Dual 50W Wireless Fast Charging Trays with Air Cooling",
          "OTA Software Updates"
        ],
        "convenience": [
          "150 kW DC Ultra-Fast Charging (10-80% in 37 mins)",
          "Front Trunk (53L Frunk) + 400L Rear Trunk",
          "Hands-Free Sensor Tailgate"
        ],
        "exterior": [
          "Continuous LED Flowing Tail Lamp",
          "19-inch Sport Bicolour Wheels with Continental SportContact Tyres",
          "Sport Brake Calipers"
        ],
        "performance": [
          "Dual Motors producing 523 bhp / 670 Nm",
          "0-100 km/h in 3.8 Seconds (Supercar Sprint)",
          "82.56 kWh Blade Battery with 580 km Range"
        ]
      }
    }
  ],
  "EX40": [
    {
      "name": "Plus Single Motor",
      "priceApprox": "₹ 56.10 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "7 Airbags",
          "Volvo City Safety Collision Avoidance with Auto-Brake",
          "Blind Spot Information System (BLIS) with Steer Assist",
          "Run-Off Road Protection"
        ],
        "comfort": [
          "Charcoal Fusion Microtech Leatherette Interior",
          "Fixed Panoramic Sunroof",
          "2-Zone CleanZone Air Purification System with PM 2.5 Filter"
        ],
        "infotainment": [
          "9-inch Touchscreen with Built-in Google Maps & Assistant",
          "High Performance Audio System with 8 Speakers",
          "Volvo Cars App Remote Pre-Conditioning"
        ],
        "convenience": [
          "One-Pedal Drive Regenerative Braking",
          "Hands-Free Power Operated Tailgate",
          "Wireless Phone Charger"
        ],
        "exterior": [
          "Thor's Hammer LED Headlights",
          "19-inch 5-Spoke Black Diamond Cut Alloys",
          "Integrated Roof Spoiler"
        ],
        "performance": [
          "Rear-Wheel Drive Electric Motor (238 bhp / 420 Nm)",
          "69 kWh Battery with 475 km Range",
          "0-100 km/h in 7.3 Seconds"
        ]
      }
    },
    {
      "name": "Ultimate Twin Motor AWD",
      "priceApprox": "₹ 62.95 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "7 Airbags",
          "Pilot Assist (L2 Semi-Autonomous Steering & Adaptive Cruise)",
          "360-Degree Surround Camera with Bird's Eye View",
          "Cross Traffic Alert with Auto-Brake"
        ],
        "comfort": [
          "Topography Translucent Backlit Decor Inlays",
          "Front Seat Cushion Extensions with Lumbar Support",
          "Heat Pump for Efficient Cold Weather Cabin Heating"
        ],
        "infotainment": [
          "Harman Kardon 600W Premium Sound (13 Speakers with Subwoofer)",
          "Google Play Store App Ecosystem",
          "Digital 12.3-inch Driver Information Display"
        ],
        "convenience": [
          "150 kW DC Fast Charging (10-80% in 28 mins)",
          "31L Front Load Frunk + 410L Rear Boot",
          "Keyless Entry with Puddle Lights"
        ],
        "exterior": [
          "Full-LED Active High Beam Headlamps",
          "20-inch 5-Spoke Black Diamond Cut Alloys",
          "Gloss Black Mirror Caps and Roof Rails"
        ],
        "performance": [
          "Dual Motor Permanent AWD (402 bhp / 660 Nm)",
          "0-100 km/h in 4.8 Seconds",
          "78 kWh Battery with 530 km ARAI Range"
        ]
      }
    }
  ],
  "ES": [
    {
      "name": "300h Exquisite",
      "priceApprox": "₹ 66.10 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "10 Airbags",
          "Vehicle Stability Control (VSC)",
          "Hill-Start Assist Control",
          "Tyre Pressure Warning System"
        ],
        "comfort": [
          "Smooth Leather Upholstery with Shimamoku Wood Ornamentation",
          "Power Front Seats with Driver Memory",
          "Electric Rear Sunshade",
          "Moonroof"
        ],
        "infotainment": [
          "12.3-inch Touchscreen with Navigation",
          "Lexus Premium Sound System with 10 Speakers",
          "Wireless Apple CarPlay"
        ],
        "convenience": [
          "Smart Entry with Push Button Start",
          "Hands-Free Kick-Sensor Power Boot",
          "Rain-Sensing Auto Wipers"
        ],
        "exterior": [
          "Signature Spindle Grille",
          "Bi-LED Headlamps with Daytime Running Lights",
          "18-inch Noise-Reducing Alloy Wheels"
        ],
        "performance": [
          "2.5L Self-Charging Hybrid Dynamic Force Engine (Combined 215 bhp)",
          "22.58 kmpl Fuel Economy",
          "e-CVT Transmission"
        ]
      }
    },
    {
      "name": "300h Luxury",
      "priceApprox": "₹ 72.50 Lakh",
      "isTopModel": true,
      "features": {
        "safety": [
          "10 Airbags",
          "Lexus Safety System+ 2.5 (Pre-Collision System, Lane Tracing Assist)",
          "Dynamic Radar Cruise Control",
          "Blind Spot Monitor"
        ],
        "comfort": [
          "Semi-Aniline Leather Seats with 14-Way Power Adjust",
          "Reclining Rear Seats with Center Armrest AC/Audio Control Panel",
          "Ventilated Front Seats"
        ],
        "infotainment": [
          "Mark Levinson 17-Speaker PurePlay Surround Audio System",
          "Head-Up Display (HUD)",
          "Wireless Phone Charging Tray"
        ],
        "convenience": [
          "Panoramic View 360-Degree Monitor",
          "Easy Access Steering Wheel with Auto Tilt & Return",
          "Card Key Transmitter"
        ],
        "exterior": [
          "3-Eye Bi-Beam LED Headlamps with BladeScan Adaptive High-beam",
          "18-inch Multi-Spoke Metallic Alloys",
          "Acoustic Noise-Insulating Glass"
        ],
        "performance": [
          "EV Drive Mode for Near-Silent City Gliding",
          "Drive Mode Select (Eco, Normal, Sport)",
          "Regenerative Electronic Braking"
        ]
      }
    }
  ],
  "Defender": [
    {
      "name": "110 S (2.0L Petrol)",
      "priceApprox": "₹ 99.00 Lakh",
      "isTopModel": false,
      "features": {
        "safety": [
          "6 Airbags",
          "Terrain Response AWD System",
          "Dynamic Stability Control (DSC)",
          "Roll Stability Control (RSC)"
        ],
        "comfort": [
          "Grained Leather Seats with Robust Woven Textile",
          "12-Way Semi-Powered Front Seats",
          "Dual-Zone Climate Control",
          "786L Cargo Boot"
        ],
        "infotainment": [
          "Pivi Pro 11.4-inch Touchscreen Navigation",
          "Meridian 400W Sound System with 10 Speakers",
          "Interactive Driver Display"
        ],
        "convenience": [
          "Electronic Air Suspension with Adaptive Dynamics",
          "3D Surround Camera with Wade Sensing",
          "Cruise Control with Speed Limiter"
        ],
        "exterior": [
          "LED Headlights with Signature DRL",
          "19-inch Style 6010 Gloss Sparkle Silver Alloys",
          "Body-Coloured Roof with Full-Size Spare on Tailgate"
        ],
        "performance": [
          "2.0L Turbo Petrol P300 (296 bhp / 400 Nm)",
          "8-Speed Automatic All-Wheel Drive",
          "Twin-Speed Transfer Box with Low Range"
        ]
      }
    },
    {
      "name": "110 HSE (3.0L Diesel MHEV)",
      "priceApprox": "₹ 1.05 Crore",
      "isTopModel": true,
      "features": {
        "safety": [
          "6 Airbags",
          "Terrain Response 2 with Configurable Off-Road Modes",
          "Wade Sensing (Up to 900mm Wading Depth)",
          "ClearSight Interior Rear View Mirror"
        ],
        "comfort": [
          "Windsor Leather 14-Way Heated & Cooled Memory Front Seats",
          "Sliding Panoramic Roof",
          "3-Zone Climate Control with Rear Cooling Assist"
        ],
        "infotainment": [
          "Meridian 700W Surround Sound System (14 Speakers + Subwoofer)",
          "Head-Up Display",
          "Wireless Apple CarPlay & Android Auto"
        ],
        "convenience": [
          "Keyless Entry with Soft-Close Tailgate",
          "Electrically Deployable Tow Bar",
          "Domestic 230V Plug Socket in Boot"
        ],
        "exterior": [
          "Matrix LED Headlights with Signature DRL",
          "20-inch Style 5098 5-Spoke Satin Dark Grey Alloys",
          "Electronic Air Suspension (Max 291mm Lift)"
        ],
        "performance": [
          "3.0L 6-Cylinder Twin-Turbo Diesel MHEV (296 bhp / 650 Nm)",
          "Electronic Active Differential with Torque Vectoring by Braking",
          "Towing Capacity of 3500 kg"
        ]
      }
    }
  ]
};

module.exports = { TRIM_VARIANTS_DATA };
