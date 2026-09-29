import { Ionicons } from "@expo/vector-icons";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MosaicPageKey =
  | "just-stopped"
  | "recovery-support"
  | "relapse-prevention"
  | "mental-health"
  | "practical-help"
  | "support-network"
  | "safety-plan"
  | "support";

type MosaicSection = { heading: string; paragraphs: string[] };

const pages: Record<MosaicPageKey, { title: string; intro: string; sections: MosaicSection[] }> = {
  "just-stopped": {
    title: "I Just Stopped - What Now?",
    intro: "You only have to get through the next safe moment. Start small and reduce pressure.",
    sections: [
      { heading: "Right now", paragraphs: ["Move away from alcohol, drugs, gambling, conflict, or anything that could pull you back into risk.", "Drink water, eat something if you can, take a few slow breaths, and avoid making big decisions while the feeling is intense."] },
      { heading: "The next ten minutes", paragraphs: ["Change rooms or go somewhere safer. Send one honest message to someone steady. Do one small physical task, then wait ten minutes before deciding what to do next."] },
      { heading: "Get connected", paragraphs: ["Use Hold the Line, your journal, meditation, a meeting, a trusted person, a GP, or a professional alcohol and drug service. You do not need the perfect plan before asking for help."] },
    ],
  },
  "recovery-support": {
    title: "Recovery Support",
    intro: "Recovery is not something you have to work out all at once. Choose one small step that helps you stay connected.",
    sections: [
      { heading: "What kind of support do I need today?", paragraphs: ["Steady yourself with water, food, breathing, or a calming part of the app.", "Name what is happening without judging yourself: tired, lonely, angry, anxious, bored, overwhelmed, ashamed, or under pressure.", "A small connection may be enough: send one message, make one call, write in your journal, or use a saved support option.", "Professional support can include a GP, counselling service, community alcohol and drug service, or residential treatment programme."] },
      { heading: "Quick recovery check-in", paragraphs: ["What is happening right now? What could make today difficult? What has helped me before? What is one safe action I can take now?"] },
      { heading: "Small recovery steps", paragraphs: ["Right now: pause, breathe, drink water, and move away from anything risky if possible.", "Today: use one part of the app and write down what is going on.", "Next 24 hours: reach out before things build up too much.", "This week: consider extra support from a GP, counsellor, aftercare service, or local alcohol and drug service."] },
      { heading: "Irish support options", paragraphs: ["HSE Drugs and Alcohol Helpline: 1800 459 459. Monday to Friday, 9:30am to 5:30pm. Email: helpline@hse.ie.", "Drugs.ie has a national directory of alcohol and drug services, including counselling, treatment, aftercare, and community support."] },
    ],
  },
  "relapse-prevention": {
    title: "Relapse Prevention",
    intro: "Notice pressure early, understand your warning signs, and take one safe step before things build up.",
    sections: [
      { heading: "What makes me more vulnerable?", paragraphs: ["People, places, feelings, and routines can combine to increase risk. Notice drinking friends, risky places, anger, loneliness, anxiety, boredom, shame, tiredness, isolation, poor sleep, or drifting from healthy routines."] },
      { heading: "My warning signs", paragraphs: ["Warning signs are signals, not failures. They can include thoughts such as 'I can handle one', feelings such as anger or numbness, isolating or cancelling plans, hiding stress, and stopping the supports that were helping."] },
      { heading: "What can I do before it gets worse?", paragraphs: ["Move away from risk. Tell the truth earlier with a simple message. Use Hold the Line, your journal, a reflection, meditation, or saved supports before the urge peaks. Eat, drink water, rest, walk, shower, delay a decision, and get through the next ten minutes."] },
      { heading: "If a setback has happened", paragraphs: ["Stop the slide, get honest quickly, look for the lesson without beating yourself up, and return to support. The next decision still matters."] },
      { heading: "Simple prevention plan", paragraphs: ["What is my main risk today? What is my early warning sign? What safe action can I take? Who or what can I connect with? What am I protecting by staying in recovery?"] },
    ],
  },
  "mental-health": {
    title: "Mental Health Support",
    intro: "Stress, anxiety, low mood, shame, anger, loneliness, poor sleep, and overwhelm can make recovery harder. Notice what is happening and take one safe next step.",
    sections: [
      { heading: "What am I dealing with today?", paragraphs: ["For anxiety or panic, slow down, sit down, drink water, and avoid big decisions at the strongest point.", "For low mood, choose one small action: shower, food, fresh air, a message, a journal note, or asking for support.", "For overwhelm, make the problem smaller. Focus on the next ten minutes or the next safe choice.", "For anger, shame, regret, loneliness, or isolation, pause, move away from conflict, and make one safe connection."] },
      { heading: "Small steps that may help", paragraphs: ["Ground yourself by naming five things you can see and putting your feet on the floor. Check the basics: food, water, sleep, caffeine, and time alone. Use the app early and make the day smaller."] },
      { heading: "Irish mental health support", paragraphs: ["HSE Your Mental Health information line: 1800 111 888. Samaritans Ireland: 116 123. Text About It: text HELLO to 50808. Pieta: 1800 247 247 or text HELP to 51444. Aware: 1800 80 48 48."] },
      { heading: "If things feel urgent or unsafe", paragraphs: ["If you or someone else is about to be harmed, call 112 or 999, or go to the nearest emergency department. If you are not in immediate danger but cannot cope, use your Safety Plan and contact support now."] },
    ],
  },
  "practical-help": {
    title: "Practical Help",
    intro: "Money, housing, work, forms, appointments, transport, food, and daily routine can put real pressure on recovery. Choose one practical next step.",
    sections: [
      { heading: "What practical pressure am I dealing with?", paragraphs: ["Name the problem: bills or debt, housing or tenancy, work or training, forms or appointments, or daily routine. Break it down into what is urgent, important, or able to wait."] },
      { heading: "Small practical steps", paragraphs: ["Write the problem in one sentence. Find one phone number, email, form, bill, letter, or appointment detail. Make one call, send one email, or ask one person for help. Put the next deadline into your calendar."] },
      { heading: "Work, jobs, and routine", paragraphs: ["Keep the first step realistic: update a CV, look at one course, contact Intreo, volunteer, study, or make a weekly plan. Look for structure rather than pressure, and notice work environments that could put recovery at risk."] },
      { heading: "Irish practical support", paragraphs: ["Citizens Information: 0818 07 4000. MABS money and debt support: 0818 07 2000. Threshold housing advice: 1800 454 454. Intreo, JobsIreland, local authorities, and Additional Needs Payment may also help."] },
      { heading: "Simple practical plan", paragraphs: ["The problem I need to deal with is... The first small step is... The person or service I can contact is... The detail I need is... I will do this by..."] },
    ],
  },
  "support-network": {
    title: "Support Network",
    intro: "Support does not have to mean family. It can be one trusted person, a professional, a helpline, a peer group, or a community service.",
    sections: [
      { heading: "What makes someone safe to contact?", paragraphs: ["Look for someone who listens without shaming, respects your recovery and boundaries, is steady enough to contact, encourages honest next steps, and helps you feel grounded. Keep distance from people who pressure you towards risk, secrecy, conflict, or chaos."] },
      { heading: "What kind of support do I need?", paragraphs: ["You may need someone to listen, help staying safe in recovery, practical support, or professional support from a GP, counsellor, addiction service, aftercare worker, mental health service, or helpline."] },
      { heading: "How to ask for support", paragraphs: ["Try: 'I am having a hard day and I do not want to isolate.' 'Can I talk to you for a few minutes?' 'I am not feeling steady and I need support before it gets worse.' Keep it short and say what you need."] },
      { heading: "Building support slowly", paragraphs: ["Start with one safe contact. Use services as part of the network. Protect your boundaries. Keep coming back: a small connection today still counts."] },
      { heading: "Irish support options", paragraphs: ["HSE Drugs and Alcohol Helpline: 1800 459 459. HSE Your Mental Health information line: 1800 111 888. Samaritans Ireland: 116 123. Drugs.ie provides a national support directory."] },
    ],
  },
  "safety-plan": {
    title: "Safety Plan",
    intro: "A safety plan is made while you are calm, so you know what to do when things feel unsafe, risky, or too much to handle alone.",
    sections: [
      { heading: "When should I use it?", paragraphs: ["Use it early if you feel close to drinking, using, gambling, harming yourself or someone else, isolating, disappearing, or going near risky people and places."] },
      { heading: "Step 1: Notice warning signs", paragraphs: ["Notice thoughts such as 'I do not care anymore', feelings such as panic or hopelessness, and behaviours such as isolating, hiding how you feel, skipping support, not eating, or not sleeping."] },
      { heading: "Step 2: Make things safer", paragraphs: ["Leave the risky place, conflict, person, gambling site, or anything pulling you towards danger. Go somewhere safer, do not stay alone if that feels unsafe, put distance between you and anything dangerous, and delay the risky decision."] },
      { heading: "Step 3: Get through ten minutes", paragraphs: ["Open Hold the Line. Drink water or eat. Write one honest sentence. Step outside or change rooms. Send one short message."] },
      { heading: "Step 4: Contact support", paragraphs: ["Try: 'I do not feel safe with my own thoughts right now. Can you stay in contact with me?' If no personal contact is available, use a professional service, GP out-of-hours, emergency department, or emergency services."] },
      { heading: "Immediate danger", paragraphs: ["If you or someone else is about to be harmed, call 112 or 999 or go to the nearest emergency department. Do not wait alone."] },
      { heading: "Irish urgent support", paragraphs: ["Samaritans: 116 123. Pieta: 1800 247 247 or text HELP to 51444. Text About It: text HELLO to 50808. HSE Your Mental Health: 1800 111 888. HSE Drugs and Alcohol Helpline: 1800 459 459."] },
    ],
  },
  support: {
    title: "Mosaic Support Guide",
    intro: "Choose the kind of help that sounds closest. You do not need to know the perfect service before asking for support.",
    sections: [
      { heading: "Start here", paragraphs: ["I need to talk to someone today: use helplines, directories, and professional support. I want to stop drinking or using: use addiction supports, meetings, treatment options, helplines, and community services. I feel unsafe or in crisis: use the Safety Plan and urgent support contacts."] },
      { heading: "Other support areas", paragraphs: ["Support can also include residential treatment, peer meetings, counselling, community addiction services, abuse and protection support, housing, welfare, money, legal advice, and local advocacy."] },
      { heading: "Important note", paragraphs: ["Mosaic does not provide emergency services, medical advice, diagnosis, counselling, or treatment. Service information can change, so check directly with a service before making decisions. If you or someone else is in immediate danger, contact emergency services."] },
    ],
  },
};

export function MosaicSupportPage({ page, onClose }: { page: MosaicPageKey | null; onClose: () => void }) {
  const content = page ? pages[page] : null;

  return (
    <Modal visible={content !== null} animationType="slide" onRequestClose={onClose}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mosaic Support</Text>
          <TouchableOpacity onPress={onClose} accessibilityLabel="Close Mosaic support page">
            <Ionicons name="close" size={28} color="#123C69" />
          </TouchableOpacity>
        </View>
        {content && (
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.intro}>{content.intro}</Text>
            {content.sections.map((section) => (
              <View key={section.heading} style={styles.section}>
                <Text style={styles.sectionHeading}>{section.heading}</Text>
                {section.paragraphs.map((paragraph) => (
                  <Text key={paragraph} style={styles.paragraph}>{paragraph}</Text>
                ))}
              </View>
            ))}
            <Text style={styles.footer}>Mosaic is a support tool and does not replace professional, medical, counselling, or emergency help.</Text>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

export type { MosaicPageKey };

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F4F7F6" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 18, paddingTop: 54, backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#D6E4E0" },
  headerTitle: { color: "#123C69", fontSize: 20, fontWeight: "900" },
  content: { padding: 22, paddingBottom: 48 },
  title: { color: "#123C69", fontSize: 30, fontWeight: "900", marginBottom: 10 },
  intro: { color: "#263238", fontSize: 17, lineHeight: 25, fontWeight: "600", marginBottom: 20 },
  section: { backgroundColor: "#FFFFFF", borderRadius: 14, padding: 16, marginBottom: 14, borderLeftWidth: 4, borderLeftColor: "#2E7D6B" },
  sectionHeading: { color: "#123C69", fontSize: 19, fontWeight: "900", marginBottom: 8 },
  paragraph: { color: "#263238", fontSize: 16, lineHeight: 24, marginBottom: 9 },
  footer: { color: "#52636A", fontSize: 14, lineHeight: 20, marginTop: 8 },
});