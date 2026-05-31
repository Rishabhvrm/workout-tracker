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

  // ── CORE / ABS ──────────────────────────────────────────────────────────────
  'lb-core-push-1': {
    muscles: 'Rectus abdominis, hip flexors',
    cues: [
      'Dead hang from the bar — full shoulder extension before you start',
      'Tuck your pelvis and curl your hips up as legs rise',
      'Raise legs until parallel to the floor (or higher)',
      'Lower slowly — 3 sec eccentric — do not just let legs drop',
    ],
    mistakes: [
      'Swinging with momentum — stop swinging before each rep',
      'Only raising to 45° — aim for parallel or above',
      'No pelvic tilt — pure hip flexion misses the abs',
    ],
  },
  'lb-core-push-2': {
    muscles: 'Transverse abdominis, rectus abdominis, obliques, glutes',
    cues: [
      'Elbows directly under shoulders, forearms parallel',
      'Body forms a straight line from head to heels',
      'Squeeze glutes and brace abs simultaneously',
      'Breathe normally — do not hold your breath',
    ],
    mistakes: [
      'Hips sagging — squeeze glutes and pull navel in',
      'Hips too high — this is not downward dog',
      'Head drooping — keep neck neutral, eyes down',
    ],
  },
  'beg-core-ua': {
    muscles: 'Transverse abdominis, rectus abdominis, obliques, glutes',
    cues: [
      'Elbows directly under shoulders, forearms parallel',
      'Body forms a straight line from head to heels',
      'Squeeze glutes and brace abs simultaneously',
      'Breathe normally — do not hold your breath',
    ],
    mistakes: [
      'Hips sagging — squeeze glutes and pull navel in',
      'Hips too high — this is not downward dog',
      'Head drooping — keep neck neutral, eyes down',
    ],
  },
  'lb-core-pull-1': {
    muscles: 'Transverse abdominis, rectus abdominis, hip flexors',
    cues: [
      'Press lower back into the floor — it must stay flat throughout',
      'Extend opposite arm and leg simultaneously, slowly',
      'Exhale as you extend; inhale as you return',
      '3–4 seconds per extension for maximum tension',
    ],
    mistakes: [
      'Lower back arching off the floor — reduce the range until you can control it',
      'Rushing — dead bug is a slow, controlled exercise',
      'Holding your breath — coordinate breath with movement',
    ],
  },
  'beg-core-la': {
    muscles: 'Transverse abdominis, rectus abdominis, hip flexors',
    cues: [
      'Press lower back into the floor — it must stay flat throughout',
      'Extend opposite arm and leg simultaneously, slowly',
      'Exhale as you extend; inhale as you return',
      '3–4 seconds per extension for maximum tension',
    ],
    mistakes: [
      'Lower back arching — reduce range of motion until you can hold it flat',
      'Rushing the movement',
      'Holding your breath',
    ],
  },
  'lb-core-pull-2': {
    muscles: 'Rectus abdominis (upper and lower)',
    cues: [
      'Kneel below the cable pulley; hold the rope at the sides of your head',
      'Flex at the spine — bring chest toward hips, not just bowing from the hip',
      'Pause at the bottom with a hard ab contraction',
      'Return slowly to get a full stretch at the top',
    ],
    mistakes: [
      'Hip hinging instead of spinal flexion — the movement comes from the abs',
      'Pulling with arms — hands stay fixed at your head',
      'Going too heavy and losing spinal flexion',
    ],
  },
  'lb-core-legs-1': {
    muscles: 'Rectus abdominis, transverse abdominis, lats',
    cues: [
      'Start on knees (ab wheel) or with a barbell',
      'Roll out only as far as your lower back stays flat',
      'Pull back using abs, not just pulling with your arms',
      'Exhale as you roll back in',
    ],
    mistakes: [
      'Rolling too far out before you have the core strength — back will arch',
      'Hips shooting up on the return',
      'Fast reps — slow and controlled is where the gains are',
    ],
  },
  'lb-core-legs-2': {
    muscles: 'Obliques, rectus abdominis',
    cues: [
      'Sit at a 45° lean with feet lifted or crossed',
      'Rotate from the torso — not just the arms',
      'Touch the weight to the floor on each side',
      'Keep chest open; do not round forward',
    ],
    mistakes: [
      'Only twisting the arms — rotation must come from the core',
      'Losing the lean — flat back defeats the purpose',
      'Holding your breath — exhale with each rotation',
    ],
  },
  'lb-core-upper-1': {
    muscles: 'Rectus abdominis, transverse abdominis, hip flexors',
    cues: [
      'Lie on your back; press the lower back into the floor and keep it there',
      'Legs straight, toes pointed; arms extended overhead',
      'Lift arms and legs just enough that the lower back stays flat',
      'Think of making a banana shape — a slight C-curve',
    ],
    mistakes: [
      'Lower back lifting off — reduce leg height until core can hold it flat',
      'Bending the knees to make it easier — build up to straight legs',
      'Head dropping back — keep a slight chin tuck',
    ],
  },
  'lb-core-upper-2': {
    muscles: 'Obliques, rectus abdominis',
    cues: [
      'Bring opposite elbow to knee while extending the other leg',
      'Rotate from the shoulder — do not just pull the elbow across',
      'Keep lower back pressed into the mat',
      'Slow down — 2 sec per side beats fast cycling',
    ],
    mistakes: [
      'Pulling the neck — hands lightly support the head only',
      'Going too fast — speed eliminates the rotational crunch',
      'Short ROM — fully extend the opposite leg on each rep',
    ],
  },
  'beg-core-ub': {
    muscles: 'Obliques, rectus abdominis',
    cues: [
      'Bring opposite elbow to knee while extending the other leg',
      'Rotate from the shoulder — do not just pull the elbow across',
      'Keep lower back pressed into the mat',
      'Slow down — 2 sec per side beats fast cycling',
    ],
    mistakes: [
      'Pulling the neck — hands lightly support the head only',
      'Going too fast — speed eliminates the rotational crunch',
      'Short ROM — fully extend the opposite leg on each rep',
    ],
  },
  'lb-core-arms-1': {
    muscles: 'Obliques (lateral core), glutes, hip abductors',
    cues: [
      'Stack feet or stagger them for balance',
      'Elbow directly under the shoulder',
      'Drive hip up — straight line from head to heel',
      'Free arm reaches straight up to the ceiling',
    ],
    mistakes: [
      'Hip sagging — this is the entire exercise; do not let it sag',
      'Elbow too far in or out — shoulder will suffer',
      'Top hip rotating forward — keep hips stacked',
    ],
  },
  'lb-core-arms-2': {
    muscles: 'Rectus abdominis (upper)',
    cues: [
      'Feet secured on the decline bench; arms crossed or behind head',
      'Curl your spine up — do not sit straight up with a flat back',
      'Pause at the top for 1 sec; feel the abs squeeze',
      'Lower slowly back to the start (2–3 sec)',
    ],
    mistakes: [
      'Using momentum to swing up — slow it down',
      'Pulling the neck — elbows back, eyes on the ceiling',
      'Going past parallel at the top — this reduces tension on the abs',
    ],
  },
  'beg-core-lb': {
    muscles: 'Rectus abdominis',
    cues: [
      'Lie on your back, knees bent, feet flat',
      'Hands behind your head or crossed on chest',
      'Curl just your shoulder blades off the floor — not a full sit-up',
      'Squeeze abs hard at the top; lower slowly',
    ],
    mistakes: [
      'Pulling the neck forward — look at the ceiling, not your knees',
      'Full sit-up range — stop when shoulder blades clear the floor',
      'Rushing — slow reps with a squeeze are far better than fast ones',
    ],
  },

  // ── BENCH / CHEST PRESS ─────────────────────────────────────────────────────
  'beg-bench': {
    muscles: 'Pectorals, anterior deltoid, triceps',
    cues: [
      'Plant feet firmly on the floor; slight arch in lower back',
      'Retract and depress shoulder blades into the bench',
      'Bar touches lower chest; press up and slightly back',
      'Elbows at ~75° — not fully flared to 90°',
      'Control the descent — 2 sec down',
    ],
    mistakes: [
      'Bouncing the bar off the chest',
      'Flared elbows — excessive shoulder stress',
      'Hips rising off the bench mid-rep',
    ],
  },
  'cut-bench': {
    muscles: 'Pectorals, anterior deltoid, triceps',
    cues: [
      'Plant feet firmly; slight arch in lower back',
      'Retract shoulder blades into the bench',
      'Bar touches lower chest; press up and slightly back',
      'Elbows at ~75°; control the descent — 2 sec',
    ],
    mistakes: [
      'Bouncing the bar off the chest',
      'Flared elbows',
      'Hips rising mid-rep',
    ],
  },
  'str-bench': {
    muscles: 'Pectorals, anterior deltoid, triceps',
    cues: [
      'Plant feet firmly; slight arch in lower back',
      'Retract shoulder blades into the bench',
      'Bar touches lower chest; press up and slightly back',
      'Elbows at ~75°; control the descent — 2 sec',
    ],
    mistakes: [
      'Bouncing the bar off the chest',
      'Flared elbows',
      'Hips rising mid-rep',
    ],
  },
  'beg-incline-press': {
    muscles: 'Upper pectorals, anterior deltoid, triceps',
    cues: [
      'Bench at 30–45° — higher angles shift to shoulders',
      'Dumbbells start at shoulder level, elbows at ~75°',
      'Press up and slightly inward; dumbbells nearly touch at the top',
      'Keep shoulder blades retracted throughout',
    ],
    mistakes: [
      'Bench too steep (>45°) — becomes a shoulder press',
      'Dumbbells drifting too wide at the bottom — shoulder strain',
      'Rushing the eccentric — feel the stretch at the bottom',
    ],
  },
  'str-incline': {
    muscles: 'Upper pectorals, anterior deltoid, triceps',
    cues: [
      'Bench at 30–45°',
      'Dumbbells at shoulder level; press up and inward',
      'Shoulder blades retracted; control the descent',
    ],
    mistakes: [
      'Bench too steep — becomes shoulder-dominant',
      'Dumbbells drifting wide at the bottom',
    ],
  },
  'incline-db': {
    muscles: 'Upper pectorals, anterior deltoid, triceps',
    cues: [
      'Bench at 30–45°',
      'Dumbbells at shoulder level; press up and inward',
      'Shoulder blades retracted; control the descent',
    ],
    mistakes: [
      'Bench too steep — becomes shoulder-dominant',
      'Dumbbells drifting wide at the bottom',
    ],
  },
  'home-db-press': {
    muscles: 'Pectorals, anterior deltoid, triceps',
    cues: [
      'Lie on the floor, knees bent for back support',
      'Dumbbells at shoulder level, elbows at ~75°',
      'Press up until arms nearly lock; lower until triceps touch the floor',
      'The floor limits depth — use it as a controlled reset point',
    ],
    mistakes: [
      'Letting elbows crash to the floor — control the descent',
      'Hips rising off the floor',
      'Pressing dumbbells away from each other — keep wrists over elbows',
    ],
  },
  'home-pushup': {
    muscles: 'Pectorals, anterior deltoid, triceps, core',
    cues: [
      'Hands just wider than shoulder-width, fingers pointing forward',
      'Body forms a straight line from head to heels',
      'Lower until chest nearly touches the floor',
      'Elbows at ~75° — not fully flared; squeeze chest at the top',
    ],
    mistakes: [
      'Hips sagging — engage core and glutes throughout',
      'Hips piking up — you are not in downward dog',
      'Partial reps — chest must come within an inch of the floor',
    ],
  },
  'home-pike': {
    muscles: 'Anterior and medial deltoid, upper chest, triceps',
    cues: [
      'Start in downward dog — hips high, body makes an inverted V',
      'Lower your head toward the floor between your hands',
      'Press back up to the inverted V',
      'Higher hips = more shoulder-focused',
    ],
    mistakes: [
      'Head hitting the floor hard — control the descent',
      'Hips dropping during the press — maintain the inverted V shape',
      'Too narrow hand placement — slightly wider than shoulder-width',
    ],
  },
  'cut-dips': {
    muscles: 'Lower pectorals, anterior deltoid, triceps',
    cues: [
      'Lean slightly forward (10–20°) to shift emphasis to chest',
      'Lower until upper arms are parallel to the floor',
      'Elbows flare slightly outward for chest focus',
    ],
    mistakes: [
      'Staying too upright — shifts to pure tricep dips',
      'Not going deep enough — partial ROM limits chest stretch',
      'Shrugging at the top',
    ],
  },
  'str-dips': {
    muscles: 'Lower pectorals, anterior deltoid, triceps',
    cues: [
      'Lean slightly forward (10–20°) to shift emphasis to chest',
      'Lower until upper arms are parallel to the floor',
      'Elbows flare slightly outward for chest focus',
    ],
    mistakes: [
      'Staying too upright — shifts to pure tricep dips',
      'Not going deep enough',
      'Shrugging at the top',
    ],
  },

  // ── ROWS / BACK ─────────────────────────────────────────────────────────────
  'beg-row': {
    muscles: 'Latissimus dorsi, mid trapezius, rhomboids, rear deltoid, biceps',
    cues: [
      'Hinge at hip to ~45°, back flat and neutral spine',
      'Pull bar to lower chest / upper abdomen',
      'Squeeze shoulder blades at the top — hold 1 sec',
      'Lower slowly; let the weight stretch the back at the bottom',
    ],
    mistakes: [
      'Rounding the lower back — brace your core hard',
      'Pulling too low (toward belly) — shortens ROM',
      'Using momentum to jerk the weight up',
    ],
  },
  'str-row': {
    muscles: 'Latissimus dorsi, mid trapezius, rhomboids, rear deltoid, biceps',
    cues: [
      'Hinge at hip to ~45°, back flat and neutral spine',
      'Pull bar to lower chest / upper abdomen',
      'Squeeze shoulder blades at the top — hold 1 sec',
      'Lower slowly; let the weight stretch the back',
    ],
    mistakes: [
      'Rounding the lower back — brace your core',
      'Pulling too low',
      'Using momentum',
    ],
  },
  'cut-bb-row': {
    muscles: 'Latissimus dorsi, mid trapezius, rhomboids, rear deltoid, biceps',
    cues: [
      'Hinge at hip to ~45°, back flat and neutral spine',
      'Pull bar to lower chest / upper abdomen',
      'Squeeze shoulder blades at the top',
      'Lower slowly',
    ],
    mistakes: [
      'Rounding the lower back',
      'Pulling too low',
      'Using momentum',
    ],
  },
  'barbell-row': {
    muscles: 'Latissimus dorsi, mid trapezius, rhomboids, rear deltoid, biceps',
    cues: [
      'Hinge at hip to ~45°, back flat',
      'Pull bar to lower chest / upper abdomen',
      'Squeeze shoulder blades at the top',
    ],
    mistakes: [
      'Lower back rounding — core must be braced',
      'Jerking the weight up',
    ],
  },
  'beg-cable-row': {
    muscles: 'Mid back, rhomboids, lats, biceps',
    cues: [
      'Sit tall; slight forward lean at start to get a full lat stretch',
      'Pull handle to lower abdomen; elbows stay close to your sides',
      'Squeeze shoulder blades at the end — hold 1 sec',
      'Return with control; let shoulder blades protract fully',
    ],
    mistakes: [
      'Rocking backwards — keep torso still',
      'Short ROM at the start — you lose the lat stretch',
    ],
  },
  'str-row2': {
    muscles: 'Mid back, rhomboids, lats, biceps',
    cues: [
      'Sit tall; slight forward lean at start',
      'Pull handle to lower abdomen; elbows close to sides',
      'Squeeze shoulder blades; return with full protraction',
    ],
    mistakes: [
      'Rocking backwards',
      'Short ROM at the start',
    ],
  },
  'cut-cable-row': {
    muscles: 'Mid back, rhomboids, lats, biceps',
    cues: [
      'Sit tall; slight forward lean at start',
      'Pull handle to lower abdomen; elbows close to sides',
      'Squeeze shoulder blades; return with full protraction',
    ],
    mistakes: [
      'Rocking backwards',
      'Short ROM at the start',
    ],
  },
  'home-db-row': {
    muscles: 'Latissimus dorsi, rhomboids, rear deltoid, biceps',
    cues: [
      'Same-side hand and knee on a bench for support',
      'Row the dumbbell up toward your hip — not toward your shoulder',
      'Elbow stays close to your side; squeeze at the top',
      'Full stretch at the bottom — let the shoulder blade protract',
    ],
    mistakes: [
      'Rotating the torso to assist — keep hips and shoulders square',
      'Pulling toward the shoulder — row to the hip for max lat activation',
      'Short ROM',
    ],
  },
  'home-inv-row': {
    muscles: 'Latissimus dorsi, mid traps, rhomboids, biceps',
    cues: [
      'Set a bar at hip height; hang underneath with a straight body',
      'Pull chest to the bar — body stays in plank position',
      'Squeeze shoulder blades at the top',
      'Easier: bend knees. Harder: elevate feet',
    ],
    mistakes: [
      'Hips sagging — maintain the plank',
      'Partial reps — chest must actually reach the bar',
      'Elbows flaring wide — tuck them for more back activation',
    ],
  },

  // ── LAT PULLDOWN / PULL-UPS ─────────────────────────────────────────────────
  'beg-lat-pulldown': {
    muscles: 'Latissimus dorsi, biceps, rear deltoid',
    cues: [
      'Lean back slightly (5–10°) to create a straight line of pull',
      'Drive your elbows down toward your hips — think "elbows to pockets"',
      'Touch bar to upper chest at the bottom',
      'Return with control — full arm extension to stretch the lats',
    ],
    mistakes: [
      'Pulling behind the neck — serious cervical spine risk',
      'Pulling with arms only — initiate by depressing shoulder blades first',
      'Not reaching full extension at the top',
    ],
  },
  'str-pullup': {
    muscles: 'Latissimus dorsi, biceps, rear deltoid, mid traps',
    cues: [
      'Start from a full dead hang — shoulders fully extended',
      'Initiate by depressing shoulder blades before pulling',
      'Drive elbows down and back toward your hips',
      'Chin clears the bar — full ROM every rep',
    ],
    mistakes: [
      'Not starting from a full hang',
      'Kipping or swinging — strict reps build more muscle',
      'Pulling with biceps only — think "elbows to hips"',
    ],
  },
  'cut-pullup': {
    muscles: 'Latissimus dorsi, biceps, rear deltoid, mid traps',
    cues: [
      'Start from a full dead hang',
      'Depress shoulder blades before pulling',
      'Drive elbows down and back',
      'Chin clears the bar',
    ],
    mistakes: [
      'Not starting from a full hang',
      'Kipping — strict form builds more muscle',
      'Pulling with biceps only',
    ],
  },
  'pullups': {
    muscles: 'Latissimus dorsi, biceps, rear deltoid, mid traps',
    cues: [
      'Start from a full dead hang',
      'Depress shoulder blades before pulling',
      'Drive elbows down and back',
      'Chin clears the bar',
    ],
    mistakes: [
      'Not starting from a full hang',
      'Kipping — strict form builds more muscle',
      'Pulling with biceps only',
    ],
  },
  'home-pullup': {
    muscles: 'Latissimus dorsi, biceps, rear deltoid, mid traps',
    cues: [
      'Dead hang start; shoulder blades pulled down before you pull',
      'Drive elbows toward your hips',
      'Chin clears the bar',
      'Lower slowly — 2–3 sec eccentric for maximum gains',
    ],
    mistakes: [
      'Half reps — chin must clear the bar each time',
      'Momentum and swinging — strict form builds more strength',
    ],
  },

  // ── OVERHEAD PRESS / SHOULDERS ───────────────────────────────────────────────
  'beg-shoulder-press': {
    muscles: 'Anterior and medial deltoid, upper trapezius, triceps',
    cues: [
      'Sit upright with lower back supported',
      'Start with dumbbells at ear height, elbows at 90°',
      'Press straight up; full lockout at top without shrugging',
      'Lower under control back to ear height',
    ],
    mistakes: [
      'Excessive lower back arch — keep core braced',
      'Shrugging at the top — traps should stay relaxed',
      'Elbows drifting forward — keep them in the frontal plane',
    ],
  },
  'home-db-shoulder': {
    muscles: 'Anterior and medial deltoid, upper trapezius, triceps',
    cues: [
      'Sit upright with lower back supported',
      'Dumbbells at ear height, elbows at 90°',
      'Press straight up; full lockout without shrugging',
    ],
    mistakes: [
      'Excessive arch — brace core',
      'Shrugging at the top',
      'Elbows drifting forward',
    ],
  },
  'cut-db-press': {
    muscles: 'Anterior and medial deltoid, upper trapezius, triceps',
    cues: [
      'Sit upright with lower back supported',
      'Dumbbells at ear height, elbows at 90°',
      'Press straight up; full lockout without shrugging',
    ],
    mistakes: [
      'Excessive arch — brace core',
      'Shrugging at the top',
      'Elbows drifting forward',
    ],
  },
  'str-ohp': {
    muscles: 'Anterior and medial deltoid, upper traps, triceps',
    cues: [
      'Feet shoulder-width; brace core like a plank',
      'Bar at upper chest; elbows slightly in front of the bar',
      'Press straight up — at lockout bar is over your heels',
      'Slight backward lean is fine; excessive arch is not',
    ],
    mistakes: [
      'Excessive lower back arch — brace harder',
      'Pressing the bar forward rather than straight up',
      'Not locking out fully at the top',
    ],
  },
  'ohp': {
    muscles: 'Anterior and medial deltoid, upper traps, triceps',
    cues: [
      'Feet shoulder-width; brace core',
      'Bar at upper chest; press straight up overhead',
      'Lock out at the top',
    ],
    mistakes: [
      'Excessive lumbar arch — brace harder',
      'Bar pressing forward instead of straight up',
    ],
  },
  'str-zpress': {
    muscles: 'All three deltoid heads, upper traps, triceps',
    cues: [
      'Start with palms facing you (like bicep curl end position)',
      'As you press up, rotate palms forward to finish in standard overhead press',
      'Reverse the rotation on the way down',
      'The rotation hits all three heads of the deltoid',
    ],
    mistakes: [
      'Stopping the rotation early — full rotation maximizes medial delt',
      'Going too heavy — use less weight than a standard press',
      'Shrugging at the top',
    ],
  },

  // ── LATERAL RAISE ────────────────────────────────────────────────────────────
  'beg-lateral-raise': {
    muscles: 'Medial deltoid',
    cues: [
      'Slight forward lean at the hip (10–15°)',
      'Lead with your elbows, not your hands',
      'Pinky slightly higher than thumb at the top',
      'Stop at shoulder height — going higher recruits traps',
      'Control the descent — 2–3 seconds',
    ],
    mistakes: [
      'Swinging the weight up',
      'Going too heavy — this is a small muscle',
      'Wrists above elbows — lead with the elbows',
    ],
  },
  'str-lateral': {
    muscles: 'Medial deltoid',
    cues: [
      'Slight forward lean at the hip (10–15°)',
      'Lead with elbows; stop at shoulder height',
      'Control the descent — 2–3 seconds',
    ],
    mistakes: [
      'Swinging — strict form except deliberate final-rep momentum',
      'Too heavy — lighter with more control is better',
    ],
  },
  'cut-lateral': {
    muscles: 'Medial deltoid',
    cues: [
      'Slight forward lean at the hip (10–15°)',
      'Lead with elbows; stop at shoulder height',
      'Control the descent — 2–3 seconds',
    ],
    mistakes: [
      'Swinging — use strict form',
      'Too heavy — lighter with more control is better',
    ],
  },
  'home-lateral': {
    muscles: 'Medial deltoid',
    cues: [
      'Slight forward lean at the hip (10–15°)',
      'Lead with elbows; stop at shoulder height',
      'Control the descent — 2–3 seconds',
    ],
    mistakes: [
      'Swinging — use strict form',
      'Too heavy — lighter with more control is better',
    ],
  },
  'lateral-raise-ppl': {
    muscles: 'Medial deltoid',
    cues: [
      'Slight forward lean at the hip',
      'Lead with elbows; stop at shoulder height',
      'Control the descent',
    ],
    mistakes: [
      'Swinging the weight up',
      'Too heavy — lighter and controlled wins',
    ],
  },

  // ── BICEP CURLS ─────────────────────────────────────────────────────────────
  'beg-curl': {
    muscles: 'Biceps brachii, brachialis',
    cues: [
      'Shoulder-width grip; elbows stay pinned at your sides',
      'Supinate your wrist at the top for full peak contraction',
      'Lower slowly — 2–3 sec eccentric to maximize growth',
      'Keep the torso still; do not swing',
    ],
    mistakes: [
      'Elbows drifting forward — reduces bicep activation',
      'Swinging every rep',
      'Wrist dropping at the top — maintain supination',
    ],
  },
  'str-curl': {
    muscles: 'Biceps brachii, brachialis',
    cues: [
      'Elbows stay pinned at your sides',
      'Supinate at the top for full contraction',
      'Lower slowly — 2–3 sec eccentric',
    ],
    mistakes: [
      'Elbows drifting forward',
      'Swinging every rep',
    ],
  },
  'bicep-curl': {
    muscles: 'Biceps brachii, brachialis',
    cues: [
      'Elbows stay pinned at your sides',
      'Supinate at the top',
      'Lower slowly — 2–3 sec eccentric',
    ],
    mistakes: [
      'Elbows drifting forward',
      'Swinging the weight up',
    ],
  },
  'cut-curl': {
    muscles: 'Biceps brachii, brachialis',
    cues: [
      'EZ bar reduces wrist strain vs a straight bar',
      'Full extension at bottom; full peak contraction at top',
      'Keep elbows fixed at your sides throughout',
    ],
    mistakes: [
      'Elbows drifting forward as you curl',
      'Partial reps — full ROM every time',
    ],
  },
  'home-curl': {
    muscles: 'Biceps brachii, brachialis',
    cues: [
      'Can be done alternating or simultaneously',
      'Supinate at the top — rotate palm to face ceiling',
      'Full extension at the bottom for maximum stretch',
      'Control the descent',
    ],
    mistakes: [
      'Short ROM — go all the way down each rep',
      'Not supinating at the top',
    ],
  },
  'cut-hammer': {
    muscles: 'Brachialis, brachioradialis, biceps',
    cues: [
      'Neutral grip (thumbs up) throughout — do NOT supinate',
      'Great for arm thickness and forearm development',
      'Full extension at bottom; curl until forearm is vertical',
    ],
    mistakes: [
      'Supinating the wrist — that turns it into a regular curl',
      'Swinging — keep the torso still',
    ],
  },

  // ── TRICEPS ─────────────────────────────────────────────────────────────────
  'beg-tricep': {
    muscles: 'Triceps (all three heads)',
    cues: [
      'Keep elbows pinned at your sides throughout',
      'Slight forward lean from the hip',
      'Full extension at the bottom — squeeze for 1 sec',
      'Control the return — feel the stretch at the top',
    ],
    mistakes: [
      'Elbows flaring out — they must stay fixed at your sides',
      'Using body momentum instead of isolating the triceps',
      'Not reaching full extension at the bottom',
    ],
  },
  'str-tri-push': {
    muscles: 'Triceps (all three heads)',
    cues: [
      'Elbows pinned at sides; slight hip hinge',
      'Full extension at bottom — squeeze for 1 sec',
      'Control the return',
    ],
    mistakes: [
      'Elbows flaring out',
      'Using body momentum',
    ],
  },
  'cut-tri': {
    muscles: 'Triceps (all three heads)',
    cues: [
      'Elbows pinned at sides; slight hip hinge',
      'Full extension at bottom — squeeze for 1 sec',
      'Control the return',
    ],
    mistakes: [
      'Elbows flaring out',
      'Using body momentum',
    ],
  },
  'tricep-pushdown-ppl': {
    muscles: 'Triceps (all three heads)',
    cues: [
      'Elbows pinned at sides; slight hip hinge',
      'Full extension at bottom; slow return',
    ],
    mistakes: [
      'Elbows drifting forward',
      'Swinging the weight',
    ],
  },
  'home-tri-dip': {
    muscles: 'Triceps, anterior deltoid, pectorals',
    cues: [
      'Hands on a sturdy chair behind you, fingers pointing forward',
      'Legs straight or slightly bent for difficulty',
      'Lower until elbows reach 90°',
      'Press back up by straightening the arms; stay close to the bench',
    ],
    mistakes: [
      'Back drifting too far from the bench — stay close',
      'Not going deep enough — elbows need to reach 90°',
      'Shrugging — keep shoulders down and back',
    ],
  },

  // ── FACE PULL / REAR DELT ───────────────────────────────────────────────────
  'beg-face-pull': {
    muscles: 'Rear deltoid, external rotators, mid and lower traps',
    cues: [
      'Set cable at face height or slightly above',
      'Pull toward your face; elbows flare out to 90°',
      'At the end, externally rotate — think "double bicep pose"',
      'Pause at peak contraction for 1–2 sec',
    ],
    mistakes: [
      'Going too heavy — lighter and controlled is the correct approach here',
      'No external rotation at the end — that is the entire point',
      'Letting elbows drop — keep them high and wide',
    ],
  },
  'str-facepull': {
    muscles: 'Rear deltoid, external rotators, mid and lower traps',
    cues: [
      'Cable at face height; pull toward face with elbows flared wide',
      'Externally rotate at the end — double bicep finish',
      'Pause and squeeze at peak contraction',
    ],
    mistakes: [
      'Too much weight — lighter wins here',
      'No external rotation at the end',
    ],
  },
  'cut-facepull': {
    muscles: 'Rear deltoid, external rotators, mid and lower traps',
    cues: [
      'Cable at face height; pull toward face with elbows flared wide',
      'Externally rotate at the end — double bicep finish',
      'Pause and squeeze at peak contraction',
    ],
    mistakes: [
      'Too much weight',
      'No external rotation at the end',
    ],
  },
  'face-pulls-ppl': {
    muscles: 'Rear deltoid, external rotators, mid and lower traps',
    cues: [
      'Cable at face height; elbows flared wide',
      'Externally rotate at the end — double bicep finish',
      'Pause at peak contraction',
    ],
    mistakes: [
      'Too much weight',
      'No external rotation',
    ],
  },
  'home-facepull': {
    muscles: 'Rear deltoid, rhomboids, lower traps',
    cues: [
      'Hinge forward 45° (or lie face-down on an incline bench)',
      'Arms slightly bent; lead with elbows back and out',
      'Squeeze shoulder blades at the top — hold 1 sec',
      'Go lighter than you think — rear delt is a small muscle',
    ],
    mistakes: [
      'Too much body swing',
      'Elbows dropping below shoulder height',
      'Too heavy — you will end up using traps instead of rear delts',
    ],
  },

  // ── SQUAT PATTERNS ─────────────────────────────────────────────────────────
  'str-squat': {
    muscles: 'Quads, glutes, hamstrings, spinal erectors',
    cues: [
      'Feet shoulder-width, toes angled out 15–30°',
      'Brace your core as if about to take a punch',
      'Break at hips AND knees simultaneously',
      'Knees track over your toes throughout',
      'Hit at least parallel (hip crease below knee)',
    ],
    mistakes: [
      'Butt wink at depth — work on hip mobility',
      'Knees caving in — push them out actively',
      'Half reps — go to at least parallel',
    ],
  },
  'cut-squat': {
    muscles: 'Quads, glutes, hamstrings, spinal erectors',
    cues: [
      'Feet shoulder-width, toes angled out 15–30°',
      'Brace core; break at hips AND knees simultaneously',
      'Knees track over toes; hit at least parallel',
    ],
    mistakes: [
      'Butt wink at depth — hip mobility work needed',
      'Knees caving in',
      'Half reps',
    ],
  },
  'beg-goblet-squat': {
    muscles: 'Quads, glutes, hamstrings, core',
    cues: [
      'Hold a dumbbell or kettlebell at chest height with both hands',
      'Feet slightly wider than shoulder-width, toes turned out',
      'Sit between your knees — push knees out as you descend',
      'Chest stays upright; elbows can touch inner knees at the bottom',
      'Drive through the whole foot to stand',
    ],
    mistakes: [
      'Chest falling forward — the weight acts as a counterbalance; use it',
      'Knees caving inward — push them out with your elbows',
      'Heels rising — try elevating heels slightly until mobility improves',
    ],
  },
  'home-goblet': {
    muscles: 'Quads, glutes, hamstrings, core',
    cues: [
      'Hold a dumbbell at chest height with both hands',
      'Feet slightly wider than shoulder-width, toes out',
      'Sit between knees; push knees out as you descend',
      'Chest stays upright',
    ],
    mistakes: [
      'Chest collapsing forward — use the weight as a counterbalance',
      'Knees caving in',
      'Heels rising',
    ],
  },
  'str-split-squat': {
    muscles: 'Quads, glutes, hamstrings, hip flexors',
    cues: [
      'Rear foot elevated on a bench; front foot far enough forward that the front shin stays vertical at the bottom',
      'Descend straight down — front knee should not dive past the toes',
      'Keep torso upright or lean slightly forward for more glute emphasis',
      'Drive through the front heel to stand',
    ],
    mistakes: [
      'Front foot too close — shin angles forward and knee takes the load',
      'Torso collapsing forward — brace the core',
      'Back knee slamming the floor — control the descent',
    ],
  },
  'home-split': {
    muscles: 'Quads, glutes, hamstrings, hip flexors',
    cues: [
      'Rear foot on a sturdy chair or couch; front foot forward enough for a vertical shin',
      'Descend straight down; torso upright',
      'Drive through the front heel to stand',
    ],
    mistakes: [
      'Front foot too close — front knee dives past toes',
      'Torso leaning excessively forward',
      'Back knee slamming the floor',
    ],
  },

  // ── DEADLIFT / HINGE ────────────────────────────────────────────────────────
  'beg-deadlift': {
    muscles: 'Hamstrings, glutes, spinal erectors, traps, lats',
    cues: [
      'Bar over mid-foot; hip-width stance',
      'Hinge down to grip — do not squat to the bar',
      'Big breath and brace hard before pulling',
      'Bar stays in contact with your legs all the way up',
      'Lock hips and knees together at the top',
    ],
    mistakes: [
      'Rounding the lower back — reduce weight until you can brace properly',
      'Bar drifting away from the body',
      'Jerking off the floor — take slack out first, then apply force',
    ],
  },
  'str-dl': {
    muscles: 'Hamstrings, glutes, spinal erectors, traps, lats',
    cues: [
      'Bar over mid-foot; hip-width stance',
      'Big breath and brace before pulling',
      'Bar stays in contact with legs all the way up',
      'Lock hips and knees simultaneously at the top',
    ],
    mistakes: [
      'Lower back rounding — non-negotiable; reduce weight',
      'Bar drifting away from the body',
      'Jerking off the floor',
    ],
  },
  'cut-dl': {
    muscles: 'Hamstrings, glutes, spinal erectors, traps, lats',
    cues: [
      'Bar over mid-foot; big breath and brace before pulling',
      'Bar stays in contact with legs all the way up',
      'Lock hips and knees simultaneously at the top',
    ],
    mistakes: [
      'Lower back rounding',
      'Bar drifting away from the body',
      'Jerking off the floor',
    ],
  },
  'beg-rdl': {
    muscles: 'Hamstrings, glutes, spinal erectors',
    cues: [
      'Soft bend in knees throughout — this is a hip hinge, not a squat',
      'Push your hips BACK as the bar descends',
      'Bar stays close to your body — almost drags along your legs',
      'Feel a deep stretch in your hamstrings at the bottom',
      'Drive hips forward to stand — squeeze glutes at the top',
    ],
    mistakes: [
      'Bending knees too much — becomes more of a squat',
      'Rounding the lower back — stop at the depth your mobility allows',
      'Bar drifting away from the body',
    ],
  },
  'str-rdl': {
    muscles: 'Hamstrings, glutes, spinal erectors',
    cues: [
      'Soft bend in knees; pure hip hinge',
      'Push hips back as bar descends; bar stays close to legs',
      'Feel the hamstring stretch; do not go lower than mobility allows',
      'Drive hips forward, squeeze glutes at the top',
    ],
    mistakes: [
      'Bending knees too much — turns into a squat',
      'Lower back rounding',
      'Bar drifting forward',
    ],
  },
  'cut-rdl': {
    muscles: 'Hamstrings, glutes, spinal erectors',
    cues: [
      'Soft bend in knees; pure hip hinge',
      'Push hips back; bar stays close to legs',
      'Feel the hamstring stretch; drive hips forward at the top',
    ],
    mistakes: [
      'Bending knees too much',
      'Lower back rounding',
    ],
  },
  'home-rdl': {
    muscles: 'Hamstrings, glutes, spinal erectors',
    cues: [
      'Soft bend in knees; pure hip hinge',
      'Push hips back as dumbbells descend; keep them close to legs',
      'Feel the hamstring stretch; squeeze glutes at the top',
    ],
    mistakes: [
      'Bending knees too much',
      'Lower back rounding',
      'Weights drifting away from the legs',
    ],
  },
  'rdl-ppl': {
    muscles: 'Hamstrings, glutes, spinal erectors',
    cues: [
      'Soft knee bend; hip hinge',
      'Bar close to legs; push hips back',
      'Hamstring stretch at bottom; squeeze glutes at top',
    ],
    mistakes: [
      'Knees bending too much — hip hinge, not squat',
      'Lower back rounding',
    ],
  },
  'cut-hip-thrust': {
    muscles: 'Glutes, hamstrings',
    cues: [
      'Upper back rests on a bench; feet flat on the floor',
      'Drive through your heels to lift your hips',
      'Squeeze glutes hard at the top — hold for 1–2 sec',
      'Shins should be vertical when hips are at the top',
    ],
    mistakes: [
      'Feet too far away or too close — shins should be vertical at the top',
      'Hyperextending the lower back — keep ribs down',
      'Not reaching full hip extension',
    ],
  },
  'home-hip-thrust': {
    muscles: 'Glutes, hamstrings',
    cues: [
      'Upper back on a sturdy couch or bench; feet flat on floor',
      'Drive through heels; squeeze glutes at the top',
      'Hold the peak contraction for 1–2 sec',
    ],
    mistakes: [
      'Feet too far — shins should be vertical at the top',
      'Lower back hyperextension — rib cage stays down',
      'Not squeezing the glutes',
    ],
  },
  'beg-glute-bridge': {
    muscles: 'Glutes, hamstrings, core',
    cues: [
      'Lie on your back, knees bent, feet flat on the floor',
      'Drive through heels to lift hips toward the ceiling',
      'Squeeze glutes at the top — hold for 1–2 sec',
      'Keep your back straight — do not hyperextend',
    ],
    mistakes: [
      'Not squeezing the glutes — press through heels, not toes',
      'Hyperextending the lower back at the top',
      'Feet too far away — bring them closer so shins are nearly vertical',
    ],
  },

  // ── LEG ISOLATION ───────────────────────────────────────────────────────────
  'beg-leg-press': {
    muscles: 'Quads, glutes, hamstrings',
    cues: [
      'Feet shoulder-width on the plate',
      'Lower until thighs are at 90° or slightly past',
      'Do not lock out the knees at the top',
      'Full foot contact; do not let heels rise',
    ],
    mistakes: [
      'Hips rising off the pad at the bottom — lower back injury risk',
      'Feet too low — puts excess stress on the knees',
      'Explosive lockout — keep a slight bend at the top',
    ],
  },
  'str-leg-press': {
    muscles: 'Quads, glutes, hamstrings',
    cues: [
      'Feet shoulder-width on the plate',
      'Lower to 90° or slightly past; do not lock out',
      'Full foot contact throughout',
    ],
    mistakes: [
      'Hips lifting off the pad — lower back injury',
      'Feet too low on the plate',
    ],
  },
  'cut-leg-press': {
    muscles: 'Quads, glutes, hamstrings',
    cues: [
      'Feet shoulder-width on the plate',
      'Lower to 90° or slightly past; do not lock out',
    ],
    mistakes: [
      'Hips lifting off the pad',
      'Feet too low on the plate',
    ],
  },
  'leg-press-ppl': {
    muscles: 'Quads, glutes, hamstrings',
    cues: [
      'Feet shoulder-width; lower to 90° or slightly past',
      'Do not lock out at the top',
    ],
    mistakes: [
      'Hips lifting off the pad',
      'Feet too low on the plate',
    ],
  },
  'beg-leg-curl': {
    muscles: 'Hamstrings',
    cues: [
      'Lie flat — do not let hips rise as you curl',
      'Full extension at the start to maximize stretch',
      'Curl all the way up; try to touch pad to your glutes',
      'Dorsiflex the foot (toes pulled up) for more tension',
    ],
    mistakes: [
      'Hips rising off the pad — grip the handles and press hips down',
      'Partial ROM — the full stretch is where hamstring growth lives',
      'Going too heavy and using momentum',
    ],
  },
  'cut-leg-curl': {
    muscles: 'Hamstrings',
    cues: [
      'Lie flat; full extension at the start',
      'Curl to full ROM; hips stay on the pad',
      'Control the descent',
    ],
    mistakes: [
      'Hips rising — press them into the pad',
      'Partial ROM',
    ],
  },
  'leg-curl-ppl': {
    muscles: 'Hamstrings',
    cues: [
      'Lie flat; full extension at start',
      'Curl to full ROM; control the descent',
    ],
    mistakes: [
      'Hips rising off the pad',
      'Partial reps',
    ],
  },
  'beg-calf-raise': {
    muscles: 'Gastrocnemius, soleus',
    cues: [
      'Full range: deep stretch at the bottom, full plantar flexion at top',
      'Pause 1–2 sec at the top — calves respond well to slow tempo',
      'Do not bounce at the bottom',
      'Both seated and standing variations develop the calf fully',
    ],
    mistakes: [
      'Partial reps — calves need full ROM',
      'Bouncing from the bottom — Achilles injury risk',
      'Too fast — calves need time under tension',
    ],
  },
  'str-calf': {
    muscles: 'Gastrocnemius, soleus',
    cues: [
      'Full stretch at the bottom; full plantar flexion at the top',
      'Pause at the top for 1–2 sec',
      'Do not bounce at the bottom',
    ],
    mistakes: [
      'Partial reps — full ROM every time',
      'Too fast — slow reps work better for calves',
    ],
  },
  'calf-raise-ppl': {
    muscles: 'Gastrocnemius, soleus',
    cues: [
      'Full stretch at bottom; full plantar flexion at top',
      'Pause at the top; do not bounce',
    ],
    mistakes: [
      'Partial reps',
      'Bouncing — control the stretch',
    ],
  },
  'cut-calf': {
    muscles: 'Soleus (primary), gastrocnemius',
    cues: [
      'Seated calf raises target the soleus — a different muscle than standing raises',
      'Full range: deep stretch at bottom, full plantar flexion at top',
      'Pause at the top; control the descent',
    ],
    mistakes: [
      'Partial reps — soleus responds especially well to full ROM',
      'Too fast — slow and controlled',
    ],
  },
  'cut-calf2': {
    muscles: 'Gastrocnemius, soleus',
    cues: [
      'Full range: deep stretch at bottom, full plantar flexion at top',
      'Pause at the top; control the descent',
    ],
    mistakes: [
      'Partial reps',
      'Bouncing from the bottom',
    ],
  },
  'beg-lunge': {
    muscles: 'Quads, glutes, hamstrings, hip flexors',
    cues: [
      'Step forward far enough that the front shin stays vertical',
      'Back knee nearly touches the floor — full ROM',
      'Keep torso upright; do not lean excessively forward',
      'Drive through the front heel to step into the next lunge',
    ],
    mistakes: [
      'Short step — front shin goes past vertical, knee takes the load',
      'Torso leaning too far forward',
      'Letting the back knee slam into the floor',
    ],
  },
  'cut-lunge': {
    muscles: 'Quads, glutes, hamstrings, hip flexors',
    cues: [
      'Step forward; front shin stays vertical',
      'Back knee nearly touches the floor',
      'Torso upright throughout',
    ],
    mistakes: [
      'Short step — front shin goes past vertical',
      'Torso leaning too far forward',
    ],
  },
  'cut-stepup': {
    muscles: 'Quads, glutes, hamstrings',
    cues: [
      'Use a box or bench at about knee height',
      'Step fully onto the box; drive through the heel of the working leg',
      'Stand tall at the top — full hip extension',
      'Lower the trailing leg back slowly',
    ],
    mistakes: [
      'Pushing off the back foot — all power should come from the front leg',
      'Leaning too far forward',
      'Not reaching full hip extension at the top',
    ],
  },

  // ── MISC STRENGTH ───────────────────────────────────────────────────────────
  'str-shrug': {
    muscles: 'Upper trapezius',
    cues: [
      'Stand with dumbbells at your sides, arms straight',
      'Shrug straight up — do NOT roll your shoulders back or forward',
      'Pause at the top for 1–2 sec for maximum contraction',
      'Lower slowly',
    ],
    mistakes: [
      'Rolling the shoulders — shrug straight up only; rolling strains the AC joint',
      'Using too much momentum',
      'Partial reps — go all the way up for a full trap contraction',
    ],
  },
  'str-lat-raise2': {
    muscles: 'Medial deltoid',
    cues: [
      'Stand sideways to the cable; handle in the far hand (cross-body)',
      'Raise your arm out to shoulder height; lead with the elbow',
      'Cable provides constant tension throughout the rep',
      'Control the return — resist the cable on the way down',
    ],
    mistakes: [
      'Going too heavy — lighter with more control is better for delts',
      'Not resisting on the way down — that is half the gains',
    ],
  },
  'home-calf': {
    muscles: 'Gastrocnemius, soleus',
    cues: [
      'Stand on one foot on a step edge for full range of motion',
      'Full stretch at the bottom; full plantar flexion at the top',
      'Hold a wall for balance if needed; hold a weight for added resistance',
      'Pause at the top for 1–2 sec',
    ],
    mistakes: [
      'Partial range — go all the way down and all the way up',
      'Bouncing from the bottom — control the stretch',
    ],
  },

  // ── PDF LEAN BULK ───────────────────────────────────────────────────────────
  // PUSH
  'pdf-push-bench': {
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
  'pdf-push-lateral': {
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
      'Letting arms drop straight down — maintain tension throughout',
    ],
  },
  'pdf-push-incline': {
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
  'pdf-push-pushdown': {
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
  'pdf-push-dips': {
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
  'pdf-push-knee-raise': {
    muscles: 'Rectus abdominis, hip flexors',
    cues: [
      'Dead hang from the bar — full shoulder extension before you start',
      'Tuck your pelvis and curl your hips up as knees rise',
      'Raise knees to at least hip height (higher = more abs, less hip flexor)',
      'Lower slowly — 2–3 sec eccentric — do not just let legs drop',
    ],
    mistakes: [
      'Swinging with momentum — stop swinging before each rep',
      'Only raising to 45° — aim for parallel or above',
      'No pelvic tilt — pure hip flexion misses the abs',
    ],
  },

  // PULL
  'pdf-pull-pullups': {
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
  'pdf-pull-facepulls': {
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
  'pdf-pull-row': {
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
  'pdf-pull-ezcurl': {
    muscles: 'Biceps brachii, brachialis',
    cues: [
      'EZ bar reduces wrist strain vs straight bar',
      'Full extension at bottom; full peak contraction at top',
      'Keep elbows fixed at your sides',
      'Supinate slightly at the top for full bicep contraction',
    ],
    mistakes: [
      'Letting elbows drift forward as you curl — reduces bicep activation',
      'Partial reps — each rep should be full ROM',
      'Swinging — use a wall if needed to keep strict',
    ],
  },
  'pdf-pull-incline-curl': {
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
  'pdf-pull-cable-crunch': {
    muscles: 'Rectus abdominis (upper and lower)',
    cues: [
      'Kneel below the cable pulley; hold the rope at the sides of your head',
      'Flex at the spine — bring chest toward hips, not just bowing from the hip',
      'Pause at the bottom with a hard ab contraction',
      'Return slowly to get a full stretch at the top',
    ],
    mistakes: [
      'Hip hinging instead of spinal flexion — the movement comes from the abs',
      'Pulling with arms — hands stay fixed at your head',
      'Going too heavy and losing spinal flexion',
    ],
  },

  // LEGS
  'pdf-legs-squat': {
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
  'pdf-legs-rdl': {
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
  'pdf-legs-press': {
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
  'pdf-legs-calf': {
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
  'pdf-legs-ab-wheel': {
    muscles: 'Rectus abdominis, transverse abdominis, lats',
    cues: [
      'Start on knees; roll out only as far as your lower back stays flat',
      'Pull back using your abs — not just pulling with your arms',
      'Exhale as you roll back in; brace on the way out',
      'Start with a short range and gradually extend over weeks',
    ],
    mistakes: [
      'Rolling too far out before you have the core strength — back will arch',
      'Hips shooting up on the return',
      'Fast reps — slow and controlled is where the gains are',
    ],
  },

  // UPPER
  'pdf-upper-incline-bench': {
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
      'Bouncing the bar — control the descent',
    ],
  },
  'pdf-upper-lat-pulldown': {
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
  'pdf-upper-cs-row': {
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
  'pdf-upper-cable-fly': {
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
  'pdf-upper-lateral': {
    muscles: 'Medial deltoid',
    cues: [
      'Slight forward lean at hip (10–15°) for better medial delt targeting',
      'Lead with your elbows, not your hands',
      'Stop at shoulder height — going higher recruits traps',
      'On the last set, do partial reps from the bottom for extra burn',
    ],
    mistakes: [
      'Swinging for regular reps — save momentum for deliberate intensity techniques',
      'Elbows below wrists — keeps the focus off medial delt',
      'Too heavy — lighter and controlled is more effective',
    ],
  },

  // ARMS + DELTS
  'pdf-arms-ohp': {
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
  'pdf-arms-ezcurl': {
    muscles: 'Biceps brachii, brachialis',
    cues: [
      'EZ bar reduces wrist strain vs straight bar',
      'Full extension at bottom; full peak contraction at top',
      'Keep elbows fixed at your sides throughout',
      'Supinate slightly at the top for full contraction',
    ],
    mistakes: [
      'Letting elbows drift forward as you curl — reduces bicep activation',
      'Partial reps — full ROM every rep',
      'Swinging the torso — keep it strict',
    ],
  },
  'pdf-arms-skull': {
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
  'pdf-arms-hammer': {
    muscles: 'Brachialis, brachioradialis, biceps',
    cues: [
      'Neutral grip (thumbs up) throughout — do NOT supinate',
      'Great for building arm thickness and forearm strength',
      'Full extension at bottom; curl until forearm is vertical',
      'Control the descent — 2–3 sec eccentric',
    ],
    mistakes: [
      'Supinating the wrist — that\'s just a regular curl; keep it neutral',
      'Going too heavy with poor form',
      'Swinging — keep the torso still',
    ],
  },
  'pdf-arms-pushdown': {
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
  'pdf-arms-rear-delt': {
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
  'pdf-arms-leg-raise': {
    muscles: 'Rectus abdominis, hip flexors',
    cues: [
      'Dead hang from the bar — full shoulder extension before you start',
      'Tuck your pelvis and curl your hips up as legs rise',
      'Raise legs until parallel to the floor (or higher for more abs)',
      'Lower slowly — 3 sec eccentric — do not just let legs drop',
    ],
    mistakes: [
      'Swinging with momentum — stop swinging before each rep',
      'Only raising to 45° — aim for parallel or above',
      'No pelvic tilt — pure hip flexion misses the abs',
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
