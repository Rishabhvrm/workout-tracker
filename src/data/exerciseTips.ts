// Keyed by exercise ID. Each entry has muscles targeted, form cues, and common mistakes.
export interface ExerciseTip {
  muscles: string;
  cues: string[];
  mistakes: string[];
}

export const exerciseTips: Record<string, ExerciseTip> = {
  // PUSH
  'barbell-bench': {
    muscles: 'Pectorals, anterior deltoid, triceps',
    cues: [
      'Plant your feet firmly on the floor or on a step',
      'Slight arch in lower back — shoulder blades pinched & depressed',
      'Bar path: from lower chest up and slightly back toward your face',
      'Elbows at ~75° to your torso (not flared to 90°)',
      'Grip just outside shoulder width; wrists straight over elbows',
    ],
    mistakes: [
      'Bouncing the bar off the chest — control the descent (2–3 sec)',
      'Flared elbows — puts excessive stress on the shoulder joint',
      'Lifting your hips off the bench mid-set',
      'Gripping too wide or too narrow — both limit strength & safety',
    ],
  },
  'incline-db-press': {
    muscles: 'Upper pectorals, anterior deltoid, triceps',
    cues: [
      'Set bench to 30–45° — higher angles shift emphasis to shoulders',
      'Dumbbells start at shoulder level, neutral or pronated grip',
      'Press up and slightly inward so dumbbells nearly touch at top',
      'Keep shoulder blades retracted throughout',
    ],
    mistakes: [
      'Too steep an incline (>45°) turns it into a shoulder press',
      'Letting the dumbbells drift too far out at the bottom — shoulder strain',
      'Rushing the concentric — feel the stretch at the bottom',
    ],
  },
  'seated-db-shoulder': {
    muscles: 'Medial & anterior deltoid, upper trapezius, triceps',
    cues: [
      'Sit upright with lower back supported',
      'Start with dumbbells at ear height, elbows at 90°',
      'Press straight up — don\'t lean back excessively',
      'Full lockout at top without shrugging',
    ],
    mistakes: [
      'Excessive lumbar arch — compresses the spine',
      'Shrugging at the top — traps should stay relaxed',
      'Elbows drifting forward — keep them in the frontal plane',
    ],
  },
  'lateral-raise': {
    muscles: 'Medial deltoid',
    cues: [
      'Slight forward lean at hip (10–15°) to better target medial delt',
      'Lead with your elbows, not your hands',
      'Pinky slightly higher than thumb at the top (like pouring water)',
      'Stop at shoulder height — going higher recruits traps',
      'Control the descent — 2–3 seconds down',
    ],
    mistakes: [
      'Swinging the weight — use momentum only as a last resort on final reps',
      'Going too heavy — medial delt is a small muscle; 15 lbs is often enough',
      'Letting arms drop straight down — maintain slight forward lean',
    ],
  },
  'chest-dips': {
    muscles: 'Lower pectorals, anterior deltoid, triceps',
    cues: [
      'Lean slightly forward (10–20°) to shift emphasis to chest',
      'Lower until upper arms are parallel to the floor (or just below)',
      'Flare elbows slightly outward for chest focus',
      'Press back up and slightly forward',
    ],
    mistakes: [
      'Staying too upright — makes it a tricep dip, not chest',
      'Not going deep enough — partial ROM limits chest stretch',
      'Shrugging your shoulders upward at the top',
    ],
  },
  'tricep-pushdown': {
    muscles: 'Triceps (all three heads)',
    cues: [
      'Keep your elbows pinned at your sides throughout',
      'Slight forward lean from the hip',
      'Full extension at the bottom — squeeze for 1 sec',
      'Control the return; feel the stretch at the top',
    ],
    mistakes: [
      'Elbows flaring out — elbows must stay fixed at your sides',
      'Using body momentum — engage only the triceps',
      'Not reaching full extension at the bottom',
    ],
  },

  // PULL
  'pullups-pulldown': {
    muscles: 'Latissimus dorsi, biceps, rear deltoid, mid traps',
    cues: [
      'Start from a dead hang — full shoulder extension',
      'Initiate by depressing your shoulder blades before pulling',
      'Drive your elbows down and back, not just pulling with arms',
      'Chin clears the bar at the top (pull-ups) or touch bar to chest (pulldown)',
    ],
    mistakes: [
      'Not starting from a full hang — half ROM means half gains',
      'Kipping or swinging — use strict form for maximum muscle activation',
      'Pulling with biceps only — think "elbows to hips"',
    ],
  },
  'bb-db-row': {
    muscles: 'Latissimus dorsi, mid trapezius, rhomboids, rear deltoid, biceps',
    cues: [
      'Hinge at hip to ~45°, back flat and neutral',
      'Pull the bar to your lower chest / upper abdomen',
      'Squeeze shoulder blades at the top — hold 1 sec',
      'Let the weight stretch at the bottom (don\'t let shoulder round forward)',
    ],
    mistakes: [
      'Rounding the lower back — this is a spine injury waiting to happen',
      'Pulling to the belly button instead of lower chest — shortens ROM',
      'Using momentum — slow down, especially on the way down',
    ],
  },
  'seated-cable-row': {
    muscles: 'Mid back, rhomboids, lats, biceps',
    cues: [
      'Sit tall, slight forward lean at start to get a full stretch',
      'Pull handle to your lower abdomen; elbows stay close to sides',
      'Return with control — let your shoulder blades protract fully',
      'Don\'t rock your torso back to assist — keep hips neutral',
    ],
    mistakes: [
      'Rocking backwards — this turns it into a lower back exercise',
      'Short ROM — make sure to fully protract at the start of each rep',
    ],
  },
  'face-pulls': {
    muscles: 'Rear deltoid, external rotators, mid & lower traps',
    cues: [
      'Set cable at face height or slightly above',
      'Pull toward your face; elbows flare out to 90°',
      'At the end, externally rotate — think "double bicep pose"',
      'Pause at peak contraction for 1–2 sec',
    ],
    mistakes: [
      'Going too heavy — this is a corrective/health exercise; lighter & controlled wins',
      'No external rotation at the end — that\'s the entire point of the movement',
      'Letting elbows drop — keep them high and wide throughout',
    ],
  },
  'barbell-curl': {
    muscles: 'Biceps brachii, brachialis',
    cues: [
      'Shoulder-width grip; elbows stay pinned at your sides',
      'Supinate your wrist at the top for full peak contraction',
      'Lower slowly — 2–3 sec eccentric to maximize growth',
      'Don\'t swing — small hip drive on final 1–2 reps is OK',
    ],
    mistakes: [
      'Elbows drifting forward — reduces bicep activation',
      'Swinging every rep — use a wall if needed',
      'Wrist dropping at the top — maintain a neutral or supinated wrist',
    ],
  },
  'incline-db-curl': {
    muscles: 'Biceps brachii long head (outer), brachialis',
    cues: [
      'Set bench to ~45–60° — the incline creates a larger stretch',
      'Let arms hang straight down at the start',
      'Curl all the way up; supinate at the top',
      'This movement isolates more than standing — keep it strict',
    ],
    mistakes: [
      'Bench too upright — defeats the purpose of the stretch',
      'Rushing — the eccentric (lowering) phase is where most growth happens',
    ],
  },

  // LEGS
  'back-squat': {
    muscles: 'Quads, glutes, hamstrings, spinal erectors',
    cues: [
      'Feet shoulder-width, toes angled out 15–30°',
      'Brace your core as if about to take a punch',
      'Break at the hips AND knees simultaneously',
      'Knees track over your toes throughout',
      'Depth: at least parallel (hip crease below knee)',
      'Drive up through the whole foot — don\'t just push with heels',
    ],
    mistakes: [
      'Butt wink (posterior pelvic tilt at depth) — work on hip mobility',
      'Knees caving in (valgus) — push knees out actively',
      'Forward lean collapse — chest up, brace harder',
      'Half reps — go to at least parallel for full quad/glute activation',
    ],
  },
  'rdl': {
    muscles: 'Hamstrings, glutes, spinal erectors',
    cues: [
      'Soft bend in knees throughout — this is a hip hinge, not a squat',
      'Push your hips BACK (not down) as the bar descends',
      'Bar stays close to your body — almost drags along your legs',
      'Feel a stretch in your hamstrings mid-shin to floor level',
      'Drive hips forward to stand — squeeze glutes at top',
    ],
    mistakes: [
      'Bending the knees too much — turns it into a stiff-leg deadlift lite',
      'Rounding the lower back — brace hard, don\'t go lower than your mobility allows',
      'Bar drifting away from body — keep it close',
    ],
  },
  'leg-press': {
    muscles: 'Quads, glutes, hamstrings (foot placement dependent)',
    cues: [
      'Feet shoulder-width on the plate; adjust height for your goals',
      'Lower until thighs are ~90° or slightly past',
      'Don\'t lock out knees at top — maintain slight tension',
      'Full foot contact on the platform; don\'t let heels rise',
    ],
    mistakes: [
      'Letting hips come off the pad at the bottom — lower back injury risk',
      'Feet too low on plate — puts stress on the knees',
      'Locking out explosively — keep joints safe with a slight bend at top',
    ],
  },
  'walking-lunges': {
    muscles: 'Quads, glutes, hamstrings, hip flexors',
    cues: [
      'Step forward far enough that front shin is vertical',
      'Back knee nearly touches floor — full ROM',
      'Keep torso upright; don\'t lean excessively forward',
      'Drive through the front heel to step into the next lunge',
    ],
    mistakes: [
      'Short step — front shin goes past vertical, knee takes the load',
      'Torso leaning too far forward — engage your core',
      'Letting the back knee slam into the floor — control the descent',
    ],
  },
  'leg-curl': {
    muscles: 'Hamstrings (biceps femoris, semimembranosus, semitendinosus)',
    cues: [
      'Lie flat — don\'t let hips rise as you curl',
      'Full extension at the start to maximize stretch',
      'Curl all the way up — touch pad to glutes if possible',
      'Dorsiflexed foot (toes pulled up) increases hamstring tension',
    ],
    mistakes: [
      'Hips rising off the pad — grip the handles and press hips down',
      'Partial ROM — the full stretch is where hamstring growth lives',
      'Going too heavy and relying on momentum',
    ],
  },
  'calf-raise': {
    muscles: 'Gastrocnemius, soleus',
    cues: [
      'Full range: deep stretch at the bottom, full plantar flexion at top',
      'Pause 1–2 sec at the top — calves are best trained with slow tempo',
      'Don\'t bounce at the bottom — Achilles injury risk',
      'Both a bent-knee (seated) and straight-knee (standing) variation for full development',
    ],
    mistakes: [
      'Partial reps — calves are stubborn; full ROM is non-negotiable',
      'Bouncing from the bottom — use the stretch, don\'t abuse it',
      'Too fast — calves need time under tension',
    ],
  },

  // UPPER
  'incline-barbell': {
    muscles: 'Upper pectorals, anterior deltoid, triceps',
    cues: [
      'Set bench to 30–45° for maximum upper chest emphasis',
      'Bar should touch just below your collar bone at the bottom',
      'Drive bar up and slightly back toward the rack',
      'Keep shoulder blades retracted and pinned to the bench',
    ],
    mistakes: [
      'Too steep angle (>45°) — becomes a shoulder press',
      'Bar touching too low on the chest — shifts to flat press territory',
    ],
  },
  'chest-supported-row': {
    muscles: 'Mid-back, lats, rear deltoid, rhomboids',
    cues: [
      'Chest firm against pad — eliminates lower back compensation',
      'Pull elbows back and up; squeeze shoulder blades hard at top',
      'Full stretch at the bottom — let arms hang straight',
      'Great exercise for pure back isolation',
    ],
    mistakes: [
      'Chest lifting off the pad — negates the whole point of the exercise',
      'Not achieving full ROM at the bottom — you lose the stretch',
    ],
  },
  'cable-chest-fly': {
    muscles: 'Pectorals (inner, mid, or lower depending on cable height)',
    cues: [
      'Slight bend in elbows throughout — don\'t lock them straight',
      'Think "hugging a tree" — arc the arms in, not just pulling down',
      'Squeeze pecs hard at the center — hold 1 sec',
      'Slow eccentric back out to full stretch',
    ],
    mistakes: [
      'Bending elbows too much — turns it into a press',
      'Going too heavy — you lose the arc motion',
      'Not stretching fully at the end — the pec stretch is the growth signal',
    ],
  },
  'lat-pulldown-upper': {
    muscles: 'Latissimus dorsi, biceps, rear deltoid',
    cues: [
      'Lean back slightly (5–10°) to create a straight line of pull',
      'Drive your elbows down toward your hips',
      'Touch bar to upper chest at the bottom',
      'Full arm extension at the top — feel the lats stretch',
    ],
    mistakes: [
      'Pulling behind the neck — significant cervical spine risk',
      'Pulling with arms only instead of thinking "elbows down"',
      'Not reaching full extension at the top',
    ],
  },
  'db-lateral-raise-upper': {
    muscles: 'Medial deltoid',
    cues: [
      'Same as standard lateral raise — lead with elbows',
      'On the last set, do partial reps from the bottom (short range, high burn)',
      'Controlled — no swinging',
    ],
    mistakes: [
      'Swinging for regular reps — save momentum for deliberate intensity techniques',
      'Elbows below wrists — keeps the focus off medial delt',
    ],
  },

  // ARMS + SHOULDERS
  'standing-ohp': {
    muscles: 'Anterior & medial deltoid, upper traps, triceps',
    cues: [
      'Feet shoulder-width, brace your core like a plank',
      'Bar at upper chest, elbows slightly in front of the bar',
      'Press straight up; at lockout the bar is directly over your heels',
      'Slight backward lean is fine; excessive arch is dangerous',
      'Engage your glutes and abs throughout — it\'s a full-body brace',
    ],
    mistakes: [
      'Excessive lower back arch — compresses lumbar spine; brace harder',
      'Pressing the bar forward rather than straight up',
      'Not locking out fully at the top — you miss the top portion of the lift',
    ],
  },
  'ez-skull-crushers': {
    muscles: 'Triceps (long head primarily)',
    cues: [
      'Lower bar toward your forehead or just above (3–5 cm)',
      'Elbows stay pointed at the ceiling — don\'t let them flare',
      'Full extension at the top; slight shoulder angle for long head stretch',
      'Superset with curls — the pump will be intense',
    ],
    mistakes: [
      'Elbows flaring — shifts load to shoulders and elbow joint',
      'Going too heavy — this exercise taxes the elbow joint; prioritize form',
    ],
  },
  'ez-curls': {
    muscles: 'Biceps brachii, brachialis',
    cues: [
      'EZ bar reduces wrist strain vs straight bar',
      'Full extension at bottom; full peak at top',
      'Keep elbows fixed at your sides',
    ],
    mistakes: [
      'Letting elbows drift forward as you curl — reduces bicep activation',
      'Partial reps — each rep should be full ROM',
    ],
  },
  'cable-tricep-pushdown': {
    muscles: 'Triceps',
    cues: [
      'Cable constant tension is superior to dumbbell kickbacks for isolation',
      'Elbows stay at sides; small forward lean',
      'Fully extend and squeeze at bottom',
    ],
    mistakes: [
      'Moving elbows forward — turns it into a shoulder movement',
    ],
  },
  'cable-hammer-curl': {
    muscles: 'Brachialis, brachioradialis, biceps',
    cues: [
      'Neutral grip (thumbs up) throughout — do NOT supinate',
      'Great for building arm thickness and forearm strength',
      'Full extension at bottom; curl until forearm is vertical',
    ],
    mistakes: [
      'Supinating the wrist — that\'s just a regular curl; keep it neutral',
      'Going too heavy with poor form',
    ],
  },
  'lateral-raise-drop': {
    muscles: 'Medial deltoid',
    cues: [
      'Drop set: Start at a challenging weight × 8 reps, immediately drop 20–30% × 8, drop again × 8',
      'No rest between drops — that\'s the point',
      'Control quality as long as possible; some momentum on final drop is OK',
    ],
    mistakes: [
      'Resting between drops — defeats the purpose of a drop set',
      'Going too heavy on first weight — you\'ll have nothing left for drops',
    ],
  },
  'rear-delt-fly': {
    muscles: 'Rear deltoid, rhomboids, lower traps',
    cues: [
      'Hinge forward 45° (or use a reverse pec-deck machine)',
      'Arms slightly bent; lead with elbows back and out',
      'Squeeze shoulder blades at the top — hold 1 sec',
      'Go lighter than you think — rear delt is small',
    ],
    mistakes: [
      'Too much body swing — take the momentum away',
      'Elbows dropping — keep them at or above shoulder height',
    ],
  },

  // PPL fallbacks
  'bench-press': {
    muscles: 'Pectorals, anterior deltoid, triceps',
    cues: ['Shoulder blades retracted', 'Bar path: lower chest to lockout', 'Control the eccentric'],
    mistakes: ['Bouncing off chest', 'Flared elbows'],
  },
  'deadlift': {
    muscles: 'Posterior chain, traps, grip',
    cues: ['Neutral spine throughout', 'Bar close to shins', 'Drive floor away with legs', 'Lock hips and knees together'],
    mistakes: ['Rounding lower back', 'Bar drifting forward', 'Jerking off the floor'],
  },
  'squat': {
    muscles: 'Quads, glutes, hamstrings, core',
    cues: ['Brace core', 'Knees track toes', 'Break parallel', 'Drive through whole foot'],
    mistakes: ['Knee cave', 'Butt wink', 'Chest dropping'],
  },
};
