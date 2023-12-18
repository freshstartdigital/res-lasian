export enum FormType {
  Text = 'text',
  Date = 'date',
  Dropdown = 'dropdown',
  Table = 'table'
}

export enum SWMSTableType {
  BUILDING = 'building',
  ELECTRICAL = 'electrical'
}

export const FORM_DATA = [
  { label: 'Site Name', type: 'text', step: 0, field: 'siteName' },
  { label: 'Date Developed', type: 'date', step: 0, field: 'dateDeveloped' },
  { label: 'Approval Date', type: 'date', step: 0, field: 'approvalDate' },
  { label: 'Date Last Reviewed', type: 'date', step: 0, field: 'dateLastReviewed' },
  { label: 'Next Review Date', type: 'date', step: 0, field: 'nextReviewDate' },
  {
    label: 'Job Type',
    type: 'dropdown',
    step: 0,
    field: 'jobType',
    options: [
      {
        label: 'Building',
        value: SWMSTableType.BUILDING
      },
      {
        label: 'Electrical',
        value: SWMSTableType.ELECTRICAL
      }
    ]
  }
];

export const FORM_CONFIG = [
  {
    form: SWMSTableType.BUILDING,
    ids: [1, 2, 3, 4, 5]
  },
  {
    form: SWMSTableType.ELECTRICAL,
    ids: [1, 2, 3, 4, 5]
  }
];

export const SWMS_TABLE_DATA = [
  {
    name: 'Arrival at site. Unloading and Set-Up.',
    id: 1,
    values: [
      {
        subId: 1,
        task: ['Unload vehicle'],
        potentialHazards: ['Musculoskeletal strains', 'Slips, trips and falls'],
        riskBefore: '3',
        controlMeasures: [
          {
            name: 'Planning, Consultation, Adherence to Manual Handling Techniques',
            values: [
              'When unloading the vehicle we will ensure that we are as close as possible to the area where the equipment will be set up. If required we will seek out assistance in unloading heavy items, however our normal work does not include heavy items.',
              'We will use sensible manual handling techniques making sure our backs are straight and bending with the knees.'
            ]
          }
        ],
        riskAfter: '5'
      },
      {
        subId: 2,
        task: ['Working in the sun Dangerous UV Rays'],
        potentialHazards: [
          'Exposure to UV radiation.',
          'Heat stress',
          'De-hydration',
          'Collapse',
          'Nauseated',
          'Skin Cancer',
          'Bodily Injury',
          'Infection',
          'Death'
        ],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Planning and Consultation',
            values: [
              'Work health and safety legislation in each Australian state requires your employer or PCBU (person conducting a business undertaking) to provide a safe working environment.',
              'Skin cancer is a preventable disease and will actively promote, encourage and support skin protection in all work activities with which they are associated.',
              'All employees or Contractors must wear clothing to protect from the harmful UV Rays.',
              'Best options to avoid skin cancer when working outside',
              'Shirts or tops which have longer sleeves and a collar.',
              'Longer legged shorts where appropriate.',
              'Wide brimmed or legionnaire hats whenever practical.',
              'Eye protection tinted safety glasses.',
              'Actively encourage all employees to routinely apply broad spectrum water resistant 30+ sunscreen and stress the importance of regular re-application.',
              'Advise all workers, about the UV Protection Policy and encourage them to comply with it.',
              'Work and take breaks in the shade. Where no shade exists, use temporary portable shade.',
              'If possible, Plan to work indoors or in the shade during the middle of the day when UV radiation levels are strongest.',
              'Plan to do outdoor work tasks early in the morning or later in the afternoon when UV radiation levels are lower.',
              'Share outdoor tasks and rotate staff so the same person is not always out in the sun.',
              'Choose shade that has extensive overhead and side cover and is positioned away from highly reflective surfaces.'
            ]
          }
        ],
        riskAfter: '2'
      },
      {
        subId: 3,
        task: ['Unloading vehicle (cont.)'],
        potentialHazards: ['Electrical Hazards', 'Fire'],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Risk Assessment, Planning and Consultation',
            values: [
              'Before commencing any work in the roof we will consider whether live electrical wiring is a hazard.',
              'If live electrical wiring is a hazard we will consider cutting the house power and using an independent power source such as generator or neighbours power.',
              'We will walk through the premises with the owner to identify the location of all down lights and other ceiling accessories.',
              'We will record the location and type and then make the necessary precautions when laying the insulation. As a default we will leave a clearance of 50mm from incandescent lights and 200mm from halogen lights including 50mm for any transformer, unless the lights are fitted with a suitable fire rated enclosure.'
            ]
          }
        ],
        riskAfter: '5'
      }
    ]
  },
  {
    name: 'General Construction',
    id: 2,
    values: [
      {
        subId: 1,
        task: ['Use of hand and power tools'],
        potentialHazards: ['Electrocution', 'Cuts and abrasions', 'Eye and hearing damage'],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Safety Glasses, Ear Protection and RCD.'
          },
          {
            name: 'All Electrical leads and tools will be tested and tagged every 3 months in accordance with AS/NZS 3012:2010. A test register will also be available for inspection'
          },
          {
            name: 'Guards on tools and equipment will be maintained and working effectively before being used on site.'
          },
          {
            name: 'Guarding on tools will not be removed to perform any work activity.'
          }
        ],
        riskAfter: '4'
      },
      {
        subId: 2,
        task: ['Use of hand and power tools (cont.)'],
        potentialHazards: [
          'Exposure to UV radiation.',
          'Heat stress',
          'De-hydration',
          'Collapse',
          'Nauseated',
          'Skin Cancer',
          'Bodily Injury',
          'Infection',
          'Death'
        ],
        riskBefore: '2',
        controlMeasures: [
          {
            name: 'All tools and equipment will be inspected prior to work activity for any faults or defects. If a fault or defect is found the item will be removed from services, and reported to the supervisor as soon as practicable.'
          },
          {
            name: 'All persons performing work where there is a risk of a foreign object striking the eye, should consider wearing eye protection. If an item of plant or equipment creates excessive noise, that is where you need to raise your voice to talk, we will wear appropriate hearing protection and if there is a risk of injury to the head by falling objects then we will wear hard hats.'
          },
          {
            name: 'When we use plant, equipment or power tools we will also follow the manufacturer’s instructions for the correct PPE to be worn and the safe use instructions. We will be competent in the use of the PPE and risk assessments must be undertaken prior to using PPE to show that the hierarchy of control was used in determining whether or not to use PPE. '
          }
        ],
        riskAfter: '2'
      },
      {
        subId: 3,
        task: ['Using Ladders'],
        potentialHazards: ['Falling'],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Tie Offs, Base Support, Gutter Anchors, Levellers',
            values: [
              'All ladders used on site will be rated ‘Industrial’ with 120kg (minimum) load rating. A single and extension ladders must be secured at the top, bottom or both. Persons using the ladder must have 3 points of contact at all times (i.e. 2 hands and 1 foot or 2 feet and 1 hand or be holding a stable object e.g. gutter, wall frame). Ladders are to be maintained in a sound working condition and be appropriate for the task to be undertaken. Tools requiring two handed operation or a high degree of leverage force should not be used while on ladders. A ladder is not a work platform.'
            ]
          }
        ],
        riskAfter: '4'
      },
      {
        subId: 4,
        task: ['Sweeping'],
        potentialHazards: ['Dust – silicosis (RCS)', ''],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Dust Mask, Eye Protection, Wet Down Area',
            values: [
              'We will assess whether to wet down areas to reduce dust emission form works conducted. Where the risk of dust production is high, worker will wear appropriate PPE and refer to Engineering Controls that will reduce Silica Dust exposure.'
            ]
          },
          {
            name: 'RCS dust should not be disturbed by use of compressed air, blowers or sweeping.'
          },
          {
            name: 'Training Consultation &amp; Supervision',
            values: [
              'Frequent job rotation',
              'Avoid twisting',
              'Correct posture at all times',
              'Use electric floor sweeper where possible'
            ]
          }
        ],
        riskAfter: '4'
      }
    ]
  },
  {
    name: 'Working with Silica',
    id: 3,
    values: [
      {
        subId: 1,
        task: [
          'Concrete Floor Grinding',
          'Concrete Cutting',
          'Removal &amp; cutting wall/Floor Tiles.',
          'Sanding Plaster Board',
          'Grinding Villa Board',
          'Cutting',
          'Grinding Masonry Bricks/Blocks'
        ],
        potentialHazards: [
          'Dust – silicosis (RCS)',
          'Lung cancer',
          'Chronic obstructive pulmonary disease',
          'Kidney disease'
        ],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Where possible, work will be undertaken off-site. (such as pre-cutting to size, pre-drilling etc)'
          },
          {
            name: 'Relevant safety data sheet (SDS) will be obtained for products. If silica presence is uncertain, will assume it is.',
            values: [
              'All workers must familiarise themselves with the information supplied on the safety data sheet (SDS) that silica is likely to be present and comply with the requirements within.'
            ]
          },
          {
            name: 'Discussion with other trades in the affected areas.',
            values: [
              'Other trades present on site that may be impacted by the work will be notified of the work to be undertaken. Work area to be delineated (bunting) where required.'
            ]
          },
          {
            name: 'Respirators, eye wear, gloves, protective clothing',
            values: [
              'Fit testing process AS/NZS 1715 (respiratory protection)',
              'Before commencing the task or activity, workers must wear appropriate fit tested RPE. The minimum P2 mask for silica exposure.',
              'PCBU’s must provide respiratory protective equipment (RPE) that has been fit tested for the wearer.'
            ]
          },
          {
            name: 'Wetting down area.',
            values: [
              'Engineering controls such as a wet method must be used when cutting, sawing or grinding of materials that contain silica.'
            ]
          },
          {
            name: 'RCS dust should not be disturbed by use of compressed air, blowers or sweeping.'
          },
          {
            name: 'Local exhaust ventilation (LEV)'
          },
          {
            name: 'Engineering Controls -Dust extraction.',
            value: [
              'LEV is an engineering system that captures dusts, vapours, and fumes at their source and transports them away from the worker’s breathing zone. This prevents workers from inhaling these substances and reduces contamination of the general workplace air.',
              'Local exhaust ventilation (LEV) system will provide workers with guidance on managing risks from airborne contaminants and using LEV.',
              'LEV will be used only when a wet process cannot be used.',
              'For maximum protection, power tools which can attract airborne contaminates will be used in conjunction with suitable certified machinery, such as an industrial vacuum cleaner, fitted with a main PTFE filter, a recommended H-class HEPA filter and a fleece filter bag, will provide workers with maximum protection.',
              'Only use industrial vacuum cleaners and filters that comply with the M or H class requirements of AS/NZS 60335.2.69:2017.',
              'The vacuum bags will also be placed in the 200 micro metre polythene bags and responsibly disposed of.',
              'On completion of the decontamination, the area will be able to be accessed by persons who were not directly involved with the removal.'
            ]
          },
          {
            name: 'Workers will wash any exposed parts of their body (i.e. Face and hands) before eating or drinking and before leaving site.'
          }
        ],
        riskAfter: '4'
      },
      {
        subId: 2,
        task: [
          'Concrete Floor Grinding',
          'Concrete Cutting',
          'Removal &amp; cutting wall/Floor Tiles.',
          'Sanding Plaster Board',
          'Grinding Villa Board',
          'Cutting',
          'Grinding Masonry Bricks/Blocks (Cont.)'
        ],
        potentialHazards: [
          'Exposure to UV radiation.',
          'Heat stress',
          'De-hydration',
          'Collapse',
          'Nauseated',
          'Skin Cancer',
          'Bodily Injury',
          'Infection',
          'Death'
        ],
        riskBefore: '2',
        controlMeasures: [
          {
            name: 'All tools and equipment will be inspected prior to work activity for any faults or defects. If a fault or defect is found the item will be removed from services, and reported to the supervisor as soon as practicable.'
          },
          {
            name: 'All persons performing work where there is a risk of a foreign object striking the eye, should consider wearing eye protection. If an item of plant or equipment creates excessive noise, that is where you need to raise your voice to talk, we will wear appropriate hearing protection and if there is a risk of injury to the head by falling objects then we will wear hard hats.'
          },
          {
            name: 'When we use plant, equipment or power tools we will also follow the manufacturer’s instructions for the correct PPE to be worn and the safe use instructions. We will be competent in the use of the PPE and risk assessments must be undertaken prior to using PPE to show that the hierarchy of control was used in determining whether or not to use PPE. '
          }
        ],
        riskAfter: '2'
      },
      {
        subId: 3,
        task: ['Using Ladders'],
        potentialHazards: ['Falling'],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Tie Offs, Base Support, Gutter Anchors, Levellers',
            values: [
              'All ladders used on site will be rated ‘Industrial’ with 120kg (minimum) load rating. A single and extension ladders must be secured at the top, bottom or both. Persons using the ladder must have 3 points of contact at all times (i.e. 2 hands and 1 foot or 2 feet and 1 hand or be holding a stable object e.g. gutter, wall frame). Ladders are to be maintained in a sound working condition and be appropriate for the task to be undertaken. Tools requiring two handed operation or a high degree of leverage force should not be used while on ladders. A ladder is not a work platform.'
            ]
          }
        ],
        riskAfter: '4'
      },
      {
        subId: 4,
        task: ['Sweeping'],
        potentialHazards: ['Dust – silicosis (RCS)', ''],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Dust Mask, Eye Protection, Wet Down Area',
            values: [
              'We will assess whether to wet down areas to reduce dust emission form works conducted. Where the risk of dust production is high, worker will wear appropriate PPE and refer to Engineering Controls that will reduce Silica Dust exposure.'
            ]
          },
          {
            name: 'RCS dust should not be disturbed by use of compressed air, blowers or sweeping.'
          },
          {
            name: 'Training Consultation &amp; Supervision',
            values: [
              'Frequent job rotation',
              'Avoid twisting',
              'Correct posture at all times',
              'Use electric floor sweeper where possible'
            ]
          }
        ],
        riskAfter: '4'
      }
    ]
  },
  {
    name: 'Manual Handling',
    id: 4,
    values: [
      {
        subId: 1,
        task: ['Manual handling / locations of the loads and distances to be moved'],
        potentialHazards: ['Back, shoulder strain', 'Fatigue'],
        riskBefore: '3',
        controlMeasures: [
          {
            name: 'Training Consultation &amp; Supervision',
            values: [
              'Use mechanical handling equipment',
              'Team lifting',
              'Modify work place layout so materials will not be carried long distances',
              'Ensure clear access and egress'
            ]
          }
        ],
        riskAfter: '4'
      }
    ]
  },
  {
    name: 'Asbestos Removal',
    id: 5,
    values: [
      {
        subId: 1,
        task: ['Sheeting and guttering'],
        potentialHazards: ['Asbestos related diseases'],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Monitoring, Supervision, Training, PPE, Specialised Equipment.',
            values: [
              'All workers directly involved with the removal, and or handling of Asbestos will hold a general safety induction card and an approved Bonded Asbestos Removal Certificate, issued by Queensland WHS.',
              'Only workers directly involved with the removal will be present in the area where the removal is taking place.',
              'Signage and barriers will be erected if other persons are present. All workers involved in the removal will wear P2 disposable respirators (masks) and disposable coveralls.'
            ]
          },
          {
            name: 'All asbestos sheeting and gutters will be removed in full pieces where possible. Nails will be punched and screws removed, along with any trims holding the sheets in position. '
          },
          {
            name: 'Power tools will not be used on the sheeting or gutters and no cutting will take place.'
          },
          {
            name: 'External sheeting and gutters will be wet down prior to removal. Roof sheeting will not be wet down prior to removal as it will create a slip hazard and put the workers at risk of an injury. Any internal sheeting will already be sealed by existing paint, wetting down would be of no benefit and would cause damage to the floors and ceilings.'
          },
          {
            name: 'Once the internal sheeting is removed the area will be vacuumed with an industrial vacuum fitted with a HEPA filter. The vacuum bags will also be placed in the 200 micro metre polythene bags and disposed of. On completion of the decontamination the area will be able to be accessed by persons who were not directly involved with the removal.'
          },
          {
            name: 'Workers will wash any exposed parts of their body i.e. face and hands before stopping for morning tea or lunch to eat and before leaving site.'
          }
        ],
        riskAfter: '4'
      },
      {
        subId: 2,
        task: ['Bonded or friable asbestos in excess of 10 sq. metres.'],
        potentialHazards: ['Asbestos related diseases'],
        riskBefore: '1',
        controlMeasures: [
          {
            name: 'Monitoring, Supervision, training, PPE, Specialised Equipment.',
            values: [
              'A competent person will supervise the Asbestos removal work at all times whilst the work is being undertaken.'
            ]
          },
          {
            name: 'All workers will hold a general induction card. Only workers directly involved with the removal will be present in the area where the removal is taking place. Signage and barriers will be erected if other persons are present. All workers involved in the removal will wear P2 disposable respirators (masks) and disposable coveralls and gloves.'
          },
          {
            name: 'The ACM will be removed using wet methods and contained within an enclosed area.'
          },
          {
            name: 'All ventilation and Air-conditioning Networks servicing the ACM area will be closed down for the duration of the work and all vents sealed to prevent entry of airborne asbestos fibres into ducts.'
          },
          {
            name: 'After work ceases all ventilation filters for recirculated air will be replaced.'
          },
          {
            name: 'We will take care not to allow asbestos fibres to escape via pipe or conduit holes.'
          },
          {
            name: 'We shall establish a negative pressure work area for the removal of the ACM and this area will be set up in accordance with the provisions of the Code of Practice for the Safe removal of Asbestos 2nd edition. [NOHSC:2002(2005)] Latest Version 2018.'
          },
          {
            name: 'We will only use grinding or abrading tools where no other alternative is available and only after a written risk assessment has been undertaken.'
          },
          {
            name: 'We will set up and use an on-site decontamination unit.'
          },
          {
            name: 'We are aware of and will enforce “No laundering of contaminated protective clothing in workers’ homes”.'
          },
          {
            name: 'On completion of the work a competent person, other than the works supervisor, will conduct a site clearance and will issue a clearance certificate.'
          }
        ],
        riskAfter: '4'
      }
    ]
  }
];
