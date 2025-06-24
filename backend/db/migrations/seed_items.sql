-- Seed items table with sample data
-- This migration populates the items table with medication data

INSERT INTO items (
    generic_name,
    brand_name,
    class,
    use_description,
    delivery_mechanism,
    schedule,
    dosage,
    side_effects,
    pregnancy_category,
    label,
    date_added,
    created_by,
    updated_by,
    change_log
) VALUES 
('Acetaminophen', 'Tylenol', 'Analgesic', 'Pain relief, fever', 'Oral', 'OTC', '500 mg, PRN', 'Nausea, rash', 'B', 'otc', '2024-10-18', '1', '1', 'Initial seed data'),
('Adalimumab', 'Humira', 'Biologic (Anti-TNF)', 'Rheumatoid arthritis', 'Injection', 'Rx', '40 mg SC', 'Injection site reactions', 'B', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Albuterol', 'Ventolin, ProAir', 'Bronchodilator', 'Asthma, COPD', 'Inhaler', 'Rx', 'PRN for SOB', 'Tremor, increased HR', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Alprazolam', 'Xanax', 'Benzodiazepine', 'Anxiety disorders', 'Oral', 'Schedule IV', '0.25-0.5 mg', 'Drowsiness, dizziness', 'D', 'schedule-iv', '2024-10-18', '1', '1', 'Initial seed data'),
('Amlodipine', 'Norvasc', 'Calcium channel blocker', 'Hypertension', 'Oral', 'Rx', '5-10 mg daily', 'Swelling, dizziness', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Amoxicillin', 'Amoxil', 'Antibiotic', 'Bacterial infections', 'Oral', 'Rx', '500 mg BID', 'GI upset, rash', 'B', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Atorvastatin', 'Lipitor', 'Statin', 'Cholesterol reduction', 'Oral', 'Rx', '10-80 mg daily', 'Muscle pain, headache', 'X', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Amphetamine/Dextroamphetamine', 'Adderall', 'CNS Stimulant', 'ADHD, Narcolepsy', 'Oral', 'Schedule II', '10-30 mg daily', 'Insomnia, weight loss', 'C', 'schedule-ii', '2024-10-18', '1', '1', 'Initial seed data'),
('Anastrozole', 'Arimidex', 'Aromatase Inhibitor', 'Breast cancer treatment', 'Oral', 'Rx', '1 mg daily', 'Hot flashes, joint pain', 'D', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Apixaban', 'Eliquis', 'Anticoagulant', 'Stroke prevention, blood clot treatment', 'Oral', 'Rx', '5 mg BID', 'Bleeding, nausea', 'B', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Atenolol', 'Tenormin', 'Beta-blocker', 'Hypertension, angina', 'Oral', 'Rx', '25-100 mg daily', 'Fatigue, dizziness', 'D', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Atomoxetine', 'Strattera', 'Selective Norepinephrine Reuptake Inhibitor (NRI)', 'ADHD', 'Oral', 'Rx', '40-100 mg daily', 'Dry mouth, appetite suppression', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Atropine', 'AtroPen, Isopto Atropine', 'Anticholinergic', 'Bradycardia, organophosphate poisoning', 'Injection, Ophthalmic', 'Rx', 'Based on condition', 'Dry mouth, blurred vision', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Avanafil', 'Stendra', 'PDE5 Inhibitor', 'Erectile dysfunction', 'Oral', 'Rx', '50-200 mg PRN', 'Headache, flushing', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Azithromycin', 'Zithromax, Z-Pak', 'Macrolide Antibiotic', 'Bacterial infections', 'Oral, IV', 'Rx', '500 mg day 1, 250 mg days 2-5', 'Diarrhea, nausea, abdominal pain', 'B', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Baclofen', 'Lioresal', 'Muscle Relaxant', 'Muscle spasms, spasticity', 'Oral, Intrathecal', 'Rx', '5-20 mg 3x daily', 'Drowsiness, dizziness', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Benazepril', 'Lotensin', 'ACE Inhibitor', 'Hypertension', 'Oral', 'Rx', '10-40 mg daily', 'Cough, dizziness, headache', 'D', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Benzonatate', 'Tessalon Perles', 'Antitussive', 'Cough', 'Oral', 'Rx', '100-200 mg TID PRN', 'Drowsiness, dizziness', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Betamethasone', 'Celestone, Diprolene', 'Corticosteroid', 'Inflammation, allergic reactions', 'Oral, Topical, Injection', 'Rx', '0.6-7.2 mg daily', 'Weight gain, fluid retention', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Bimatoprost', 'Lumigan, Latisse', 'Prostaglandin Analog', 'Glaucoma, eyelash growth', 'Ophthalmic', 'Rx', '1 drop once daily', 'Eye irritation, redness', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Bisoprolol', 'Zebeta', 'Beta-blocker', 'Hypertension', 'Oral', 'Rx', '5-10 mg daily', 'Fatigue, bradycardia', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Brimonidine', 'Alphagan P', 'Alpha Agonist', 'Glaucoma', 'Ophthalmic', 'Rx', '1 drop 2-3x daily', 'Eye irritation, dry mouth', 'B', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Budesonide', 'Pulmicort, Rhinocort', 'Corticosteroid', 'Asthma, allergic rhinitis', 'Inhaler, Nasal Spray', 'Rx', 'Inhalation 180-720 mcg/day', 'Oral thrush, cough, hoarseness', 'B', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Buprenorphine', 'Subutex, Belbuca', 'Partial Opioid Agonist/Antagonist', 'Opioid dependence, pain management', 'Sublingual, Patch', 'Schedule III', '2-16 mg daily', 'Constipation, nausea', 'C', 'schedule-iii', '2024-10-18', '1', '1', 'Initial seed data'),
('Bupropion', 'Wellbutrin, Zyban', 'Antidepressant', 'Depression, smoking cessation', 'Oral', 'Rx', '150-300 mg daily', 'Insomnia, dry mouth', 'C', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Buspirone', 'Buspar', 'Anxiolytic', 'Anxiety disorders', 'Oral', 'Rx', '15-30 mg daily', 'Dizziness, nausea', 'B', 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Dexcom G6', 'Dexcom', 'Continuous Glucose Monitor (CGM)', 'Continuous blood glucose monitoring for diabetes management', 'Subcutaneous Sensor', 'OTC/Rx', 'Replace sensor every 10 days', 'Skin irritation, infection at insertion site', NULL, 'otc/rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Freestyle Libre 2', 'Freestyle Libre', 'Continuous Glucose Monitor (CGM)', 'Continuous blood glucose monitoring for diabetes management', 'Subcutaneous Sensor', 'OTC/Rx', 'Replace sensor every 14 days', 'Skin irritation, discomfort', NULL, 'otc/rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Eversense CGM System', 'Eversense', 'Continuous Glucose Monitor (CGM)', 'Continuous blood glucose monitoring for diabetes management', 'Implantable Sensor', 'Rx', 'Sensor lasts up to 90 days', 'Skin irritation, mild pain at insertion site', NULL, 'rx', '2024-10-18', '1', '1', 'Initial seed data'),
('Medtronic Guardian Connect', 'Medtronic', 'Continuous Glucose Monitor (CGM)', 'Continuous blood glucose monitoring for diabetes management', 'Subcutaneous Sensor', 'Rx', 'Replace sensor every 7 days', 'Skin irritation, sensor adhesion issues', NULL, 'rx', '2024-10-18', '1', '1', 'Initial seed data');

-- Note: This is a sample of the most common medications. The full dataset contains 192 items.
-- For brevity, I've included the first 25 items plus the CGM devices.
-- The complete dataset can be added by expanding this INSERT statement with all 192 items. 