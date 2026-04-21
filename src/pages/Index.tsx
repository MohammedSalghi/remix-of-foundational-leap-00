import { useEffect, useRef, useState } from "react";
import logoImg from "@/assets/logo.png";
import logoHero from "@/assets/logo-hero.png";
import {
  CircleDollarSign, EyeOff, Network, Scale, Landmark, Cpu, Link, RocketIcon,
  FileText, Bot, CheckCircle2, Building2, Banknote,
  Lightbulb, MapPin, GraduationCap, TrendingUp, TreePine,
  Sprout, Dna, Zap, Plane, ShieldCheck, Diamond, Mountain, Monitor, Leaf, Waves, Palette,
  Lock, ClipboardList, Search, Gavel, NotebookPen, Users, BadgeCheck, Award,
  Plus, ChevronDown, ExternalLink
} from "lucide-react";

/* ───── Logo Component ───── */
const AntalqaLogo = ({ size = 280, className = "" }: { size?: number; className?: string }) => (
  <img src={logoImg} alt="انطلاقة" width={size} height={size} className={className} style={{ objectFit: "contain" }} />
);
const SmallLogo = ({ size = 40 }: { size?: number }) => <AntalqaLogo size={size} />;

/* ───── Counter Hook ───── */
function useCountUp(target: number, duration: number, start: boolean, suffix = "") {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setVal(current.toLocaleString("en-US") + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration, suffix]);
  return val;
}

/* ───── Section Wrapper ───── */
const WATERMARK_BG = `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(27,58,107,0.025) 10px, rgba(27,58,107,0.025) 11px)`;

const Section = ({ id, bg, children, className = "", watermark = false }: { id: string; bg: string; children: React.ReactNode; className?: string; watermark?: boolean }) => (
  <section id={id} className={`antalqa-section ${className}`} style={{ background: watermark ? `${WATERMARK_BG}, ${bg}` : bg }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
      {children}
    </div>
  </section>
);

const SectionLabel = ({ num, children }: { num: string; children: React.ReactNode }) => (
  <div className="animate" style={{
    fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
    color: "#00B4D8", marginBottom: 12,
    fontFamily: "'Cairo',sans-serif"
  }}>{num} · {children}</div>
);

const Headline = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <h2 className="animate" style={{
    fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)",
    color: light ? "#fff" : "#0F172A", lineHeight: 1.25, margin: "0 0 20px"
  }}>{children}</h2>
);

/* ───── Icon helper ───── */
const IC = ({ icon: Icon, size = 32, color = "#00B4D8" }: { icon: any; size?: number; color?: string }) => (
  <Icon size={size} color={color} strokeWidth={1.5} />
);

/* ───── MAIN COMPONENT ───── */
const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [impactVisible, setImpactVisible] = useState(false);
  const [donutVisible, setDonutVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const donutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.15 });
    document.querySelectorAll(".animate").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setImpactVisible(true); }, { threshold: 0.3 });
    if (impactRef.current) obs.observe(impactRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setDonutVisible(true); }, { threshold: 0.3 });
    if (donutRef.current) obs.observe(donutRef.current);
    return () => obs.disconnect();
  }, []);

  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    const sectionIds = ["how", "sectors", "financing", "eligibility", "faq"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const stat1 = useCountUp(150000, 2000, statsVisible);
  const stat2 = useCountUp(5000, 2000, statsVisible, "+");
  const stat3 = useCountUp(20000, 2000, statsVisible, "+");
  const stat4 = useCountUp(11, 2000, statsVisible);
  const impact1 = useCountUp(5000, 2000, impactVisible, "+");
  const impact2 = useCountUp(20000, 2000, impactVisible, "+");

  const navLinks = [
    { label: "كيف تعمل", href: "#how" },
    { label: "القطاعات", href: "#sectors" },
    { label: "التمويل", href: "#financing" },
    { label: "الأهلية", href: "#eligibility" },
    { label: "الأسئلة", href: "#faq" },
  ];

  const problems = [
    { icon: CircleDollarSign, title: "عائق التمويل", body: "يواجه رواد الأعمال متطلبات ضمانات شبه مستحيلة من المصارف التجارية، في غياب أي آلية حكومية لاستيعاب المخاطر المالية أو تقاسمها." },
    { icon: EyeOff, title: "غياب الشفافية", body: "عمليات الموافقة على القروض بطيئة وذاتية وغير متسقة، تتركُ المؤسسين المؤهلين دون إجابات واضحة أو مسارات قابلة للمتابعة." },
    { icon: Network, title: "انعدام الدعم المنظومي", body: "يُطلق رواد الأعمال شركاتهم دون حاضنات أو مسرّعات أو توجيه مهني مدمج في مسار التمويل، فيحاولون النمو دون نظام بيئي داعم." },
    { icon: Scale, title: "التشتت التشريعي", body: "غياب إطار قانوني موحّد لتصنيف الشركات الناشئة ودعمها أفرز غموضاً متراكماً لدى المؤسسين والمصارف والجهات الحكومية على حدٍّ سواء." },
  ];

  const whatCards = [
    { icon: Landmark, title: "بنية تحتية حكومية", body: "تعمل بموجب نص قانوني رسمي، تحت إشراف مجلس أمناء يرأسه رئيس مجلس الوزراء ويضم محافظ مصرف ليبيا المركزي ووزراء الاقتصاد والمالية والتخطيط والتعليم العالي." },
    { icon: Cpu, title: "مدعومة بالذكاء الاصطناعي", body: "تُقيَّم الطلبات في دقائق معدودة عبر خوارزمية تسجيل متعددة الأبعاد تقيس الابتكار والمحتوى المحلي وخبرة المؤسس وجدوى المشروع — بمعايير شفافة قابلة للتدقيق." },
    { icon: Link, title: "تكامل رقمي شامل", body: "مرتبطة بمنظومة الأحوال المدنية ومصرف ليبيا المركزي وحاضنات الأعمال المعتمدة في الوقت الفعلي — من التسجيل إلى إصدار الرخصة في مسار واحد." },
    { icon: RocketIcon, title: "تتجاوز حدود التمويل", body: "البوابة إلى منظومة دعم متكاملة: حاضنات، وتوجيه متخصص، ومسرّعات، ورخص تجارية مؤقتة، وربط بالمستثمرين الاستراتيجيين." },
  ];

  const stepIcons = [FileText, Bot, CheckCircle2, Building2, Banknote];
  const steps = [
    { num: "١", time: "ساعة — ساعتان", title: "التقديم الأولي", body: "أنشئ حسابك باستخدام رقمك الوطني ورقم هاتفك. أكمل ملفك الريادي: البيانات الشخصية، وصف المشروع، المؤهلات الأكاديمية، وسنوات الخبرة. ترشدك المنصة في كل خطوة بواجهات بصرية مدروسة لتقليل الجهد وتعظيم معدلات الإتمام." },
    { num: "٢", time: "فوري", title: "التقييم الذكي", body: "يُقيَّم طلبك فوراً وفق خوارزمية شفافة ذات خمسة أبعاد. تحصل على نتيجة أهليتك في الوقت الفعلي بدرجة من 0 إلى 100 — مع رؤية واضحة لعناصر درجتك. لا انتظار لأسابيع في أروقة لجان. لا رفض غير مُبرَّر." },
    { num: "٣", time: "يوم — 3 أيام", title: "الموافقة الأولية", body: "يُجري فريق المراجعة المتخصص طبقة تحقق يدوية للطلبات عالية الدرجات. تُبلَّغ بالقبول أو ملاحظات تفصيلية خلال 72 ساعة. يتقدم المؤسسون المقبولون فوراً إلى مرحلة التسجيل في الحاضنة." },
    { num: "٤", time: "أسبوع", title: "التسجيل في الحاضنة", body: "يختار المؤسس عبر المنصة حاضنة معتمدة — جامعة أو مركز أعمال بلدي. عند التأكيد، تُصدر رخصة مزاولة نشاط مؤقتة رقمياً، تحمل رمز QR للتحقق، ورقمك التعريفي، وبيانات المشروع والكفيل." },
    { num: "٥", time: "أسبوع — أسبوعان", title: "صرف التمويل", body: "تُحوَّل الدفعة الأولى — 50% من قيمة التمويل المعتمد — مباشرةً إلى حسابك عبر بوابة الدفع LYPay، بالتنسيق مع مصرف ليبيا المركزي. يُصدر إشعار تأكيد رسمي. تتبعه الدفعة الثانية عقب التحقق من التسجيل في الحاضنة." },
  ];

  const evalIcons = [Lightbulb, MapPin, GraduationCap, TrendingUp, TreePine];
  const evalDimensions = [
    { pct: "30%", color: "#6BCB3D", title: "الابتكار", body: "نقيس الابتكار على مقياس هرمي من ثلاثة مستويات: تحسين، توطين تقنية، أو ابتكار جذري بملكية فكرية." },
    { pct: "20%", color: "#00B4D8", title: "المكوّن المحلي", body: "المشاريع التي يتجاوز مكوّنها المحلي 60% من التكلفة الإجمالية تحظى بالأولوية في الضمانات." },
    { pct: "20%", color: "#2B5FC7", title: "الخبرة", body: "المؤهلات الأكاديمية والخبرة المهنية — مؤشرات قدرة الفريق على تحقيق ما يعد به." },
    { pct: "15%", color: "#C9943A", title: "الجدوى الاقتصادية", body: "حجم السوق ونموذج الإيرادات ومسار التوسع والتوقعات المالية بمعايير قطاعية." },
    { pct: "10%", color: "#F5C842", title: "الأثر التنموي", body: "فرص العمل المباشرة، التصدير، التنويع الاقتصادي، والأثر الاجتماعي القابل للقياس." },
  ];

  const sectorIcons = [Sprout, Dna, Zap, Plane, ShieldCheck, Diamond, Mountain, Monitor, Leaf, Waves, Palette, Plus];
  const sectors = [
    { num: "01", title: "تكنولوجيا الزراعة والغذاء", desc: "السيادة الغذائية عبر الزراعة الدقيقة والري الذكي", badge: "الموارد", badgeColor: "#6BCB3D" },
    { num: "02", title: "التكنولوجيا الحيوية والصحية", desc: "إعادة تعريف الرعاية الصحية بالذكاء الاصطناعي والبيوتك", badge: "الصحة", badgeColor: "#2B5FC7" },
    { num: "03", title: "تكنولوجيا الطاقة", desc: "ما وراء النفط — نحو الطاقة المتجددة والهيدروجين الأخضر", badge: "الطاقة", badgeColor: "#F5C842" },
    { num: "04", title: "تكنولوجيا الطيران والفضاء", desc: "قدرة سيادية استراتيجية لا غنى عنها", badge: "استراتيجي", badgeColor: "#1B3A6B" },
    { num: "05", title: "التكنولوجيا الأمنية والدفاعية", desc: "قدرة محلية وتوظيف عالي القيمة", badge: "الأمن", badgeColor: "#374151" },
    { num: "06", title: "تكنولوجيا المواد النادرة", desc: "من الخام إلى المنتج عالي القيمة المُضافة", badge: "الصناعة", badgeColor: "#7C3AED" },
    { num: "07", title: "تكنولوجيا التعدين", desc: "تحديث الاستخراج وتعظيم القيمة الوطنية", badge: "الموارد", badgeColor: "#92400E" },
    { num: "08", title: "الاقتصاد الرقمي والاتصالات", desc: "البنية التحتية لكل ما عداها", badge: "الرقمي", badgeColor: "#00B4D8" },
    { num: "09", title: "الاقتصاد الأخضر", desc: "الاستدامة ميزة تنافسية لا تكلفة", badge: "البيئة", badgeColor: "#16A34A" },
    { num: "10", title: "الاقتصاد الأزرق", desc: "1700 كيلومتر من السواحل — اقتصاد ينتظر البناء", badge: "البحر", badgeColor: "#0284C7" },
    { num: "11", title: "الاقتصاد الإبداعي", desc: "الموهبة صادرات — والإبداع قطاع", badge: "الإبداع", badgeColor: "#DB2777" },
    { num: "12", title: "قطاعات إضافية", desc: "كما يحددها قرار وزير الاقتصاد والتجارة", badge: "مفتوح", badgeColor: "#C9943A" },
  ];

  const tabData = [
    { label: "للمؤسسين ورواد الأعمال", headline: "لديك الفكرة. الآن لديك المسار.", intro: "لرواد الأعمال الليبيين — المهندسين والعلماء وأصحاب الكفاءات التكنولوجية — تُغيّر انطلاقة كل شيء. لم تعد بحاجة إلى اجتياز إجراءات مصرفية معقدة بمفردك، أو توفير ضمانات لا تملكها.", pills: ["تمويل حتى 150,000 دينار", "تقييم ذكي فوري", "رخصة تجارية مؤقتة", "التحاق بحاضنة معتمدة", "ضمان مصرفي حكومي", "دعم فني متواصل"], pillColor: "#00B4D8" },
    { label: "للمصارف والمؤسسات المالية", headline: "معادلة المخاطر تغيّرت.", intro: "تواجه المصارف التجارية الليبية لعقود طلباً كامناً هائلاً على تمويل الشركات الناشئة، وآليات غير كافية لاستيعاب المخاطر. انطلاقة تحل هذه المعضلة هيكلياً.", pills: ["تغطية ضمان مخاطر حكومي", "ملفات مقترضين مُقيَّمة مسبقاً", "تكامل سلس مع المنصة", "توثيق امتثال تنظيمي", "إدارة منظّمة للصرف", "تقارير مالية دقيقة"], pillColor: "#2B5FC7" },
    { label: "للحكومة والجهات الرسمية", headline: "السياسة تصبح أثراً قابلاً للقياس.", intro: "لحكومة الوحدة الوطنية ووزارة الاقتصاد، انطلاقة هي الترجمة التشغيلية للرؤية الاقتصادية الوطنية إلى نتائج قابلة للقياس الكمي في الوقت الفعلي.", pills: ["بيانات أثر اقتصادي فوري", "تحليلات أداء قطاعية", "امتثال كامل للتدقيق", "حوكمة منظومة الناشئة", "قياس التنويع الاقتصادي", "تقارير شاملة"], pillColor: "#6BCB3D" },
  ];

  const faqData = [
    { q: "هل انطلاقة منحة أم قرض؟", a: "انطلاقة تقدم قروضاً انطلاقية — لا منحاً. تُحدَّد شروط السداد من قِبل مجلس الأمناء بحسب كل حالة، بحد أقصى ثماني سنوات. الضمان الحكومي يُغطي المخاطر التي يتحملها المصرف الشريك، لا التزام المؤسس." },
    { q: "هل يمكنني التقديم إذا كان لديّ مشروع قائم؟", a: "نعم، بشرط ألا يتجاوز عمر شركتك 10 سنوات، وأن تعمل في قطاع مؤهل، وأن تستوفي عتبة المحتوى المحلي، وألا تكون قد حصلت سابقاً على تمويل انطلاقة." },
    { q: "ماذا يحدث إذا سجّل طلبي أقل من 85؟", a: "الطلبات بين 70 و84 تُصنَّف مشاريع واعدة وتستحق الأهلية لبرامج الحاضنات والمسرّعات بموجب المادة 13. الطلبات دون 70 تُوضَع في مسار التطوير مع توجيه منظّم قبل إعادة التقديم." },
    { q: "هل يمكن لغير الليبيين التقديم؟", a: "المتطلب الأساسي هو الجنسية الليبية للمالك الأغلبية. الشراكات والمشاريع المشتركة مع الدوليين مدعومة صراحةً ويحظى نقل المعرفة والتكنولوجيا بتقدير خاص في التقييم." },
    { q: "كيف يتم التحقق من الكفيل؟", a: "تُرسَل بيانات الكفيل عبر المنصة وتُتحقق منها فوراً مقابل قاعدة بيانات الأحوال المدنية الليبية وقاعدة بيانات جهة العمل. تُؤكِّد المنصة الهوية وصلة القرابة وحالة التوظيف ومستوى الراتب آلياً — دون مستندات يدوية." },
    { q: "ما القطاعات المستثناة؟", a: "المشاريع التي لا تملك تراخيص سارية، والمشاريع التي تنتهك المعايير البيئية أو الصحية، والمشاريع في قطاعات غير مُحددة بموجب القرار 81 لسنة 2025." },
  ];

  const eligibilityIcons = [Users, ClipboardList, Users, Building2];
  const eligibility = [
    { title: "أهلية المؤسس", items: ["الجنسية الليبية (الملكية الأساسية)", "العمر بين 22 و38 سنة وقت التقديم", "عدم العمل في مؤسسة حكومية (أو إجازة لا تقل عن سنتين)", "فكرة ريادية مبتكرة ضمن قطاع مؤهل"] },
    { title: "متطلبات المشروع", items: ["ضمن القطاعات الأحد عشر — القرار 81/2025", "مكوّن محلي يتجاوز 60% من التكلفة الإجمالية", "التمويل موجّه لتطوير المنتج أو دخول السوق", "عمر الشركة لا يتجاوز 10 سنوات"] },
    { title: "متطلبات الكفيل", items: ["قريب من الدرجة الأولى يعمل في القطاع العام", "يُتحقق منه عبر منظومة الأحوال المدنية فورياً", "راتب كافٍ لتغطية التزامات السداد عند التعثر"] },
    { title: "متطلب الحضانة", items: ["التسجيل في حاضنة معتمدة وطنياً شرط إلزامي", "(جامعة أو مركز أعمال بلدي)", "شرط لاستلام الدفعة الثانية من التمويل", "الاختيار عبر دليل الحاضنات المُدمَج في المنصة"] },
  ];

  const securityCards = [
    { icon: Lock, title: "التشفير الكامل", items: ["TLS/SSL في النقل", "AES-256 في التخزين", "تشفير المفاتيح الحساسة"], badge: "ISO 27001" },
    { icon: ClipboardList, title: "سجل التدقيق", items: ["تسجيل كل إجراء بتوقيت كامل", "نظام أدوار دقيق (مؤسس/مشرف/مصرف)", "غير قابل للتلاعب أو الحذف"], badge: "Audit Trail" },
    { icon: Search, title: "ذكاء اصطناعي قابل للشرح", items: ["كل درجة من معايير موثقة", "المؤسس يفهم درجته", "لا نماذج معتمة — شفافية كاملة"], badge: "Explainable AI" },
  ];

  const boardMembers = [
    "رئيس مجلس الوزراء (رئيساً)", "محافظ مصرف ليبيا المركزي", "وزير الاقتصاد والتجارة",
    "وزير المالية", "وزير التخطيط", "وزير العمل والتأهيل",
    "وزير التعليم العالي والبحث العلمي", "وزير التعليم التقني والفني", "مدير عام مجلس التطوير الاقتصادي"
  ];

  const donutSegments = [
    { pct: 30, color: "#6BCB3D", label: "الابتكار" },
    { pct: 20, color: "#00B4D8", label: "المكوّن المحلي" },
    { pct: 20, color: "#2B5FC7", label: "الخبرة" },
    { pct: 15, color: "#C9943A", label: "الجدوى" },
    { pct: 10, color: "#F5C842", label: "الأثر" },
    { pct: 5, color: "#94A3B8", label: "الديموغرافيا" },
  ];
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const css = `
    html { scroll-behavior: smooth; }
    .antalqa-section { padding: 96px 0; }
    @media(max-width:768px) { .antalqa-section { padding: 64px 0; } }
    .animate { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
    .animate.visible { opacity: 1; transform: translateY(0); }
    .logo-float { animation: logoFloat 6s ease-in-out infinite; }
    @keyframes logoFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    .dot-pattern { background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 28px 28px; }
    .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
    .sector-card:hover { border-color: #00B4D8; box-shadow: 0 8px 24px rgba(0,180,216,0.12); }
    .cta-primary { transition: transform 0.2s, box-shadow 0.2s; }
    .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(107,203,61,0.45); }
    .donut-arc { transition: stroke-dasharray 1.2s ease-out; }
    .nav-link { position: relative; }
    .nav-link.active::after { content: ''; position: absolute; bottom: -4px; right: 0; left: 0; height: 2px; background: #2B5FC7; border-radius: 1px; }
    .timeline-line { background: linear-gradient(to bottom, #2B5FC7, #00B4D8, #6BCB3D); }
    @media(max-width:768px) { .nav-links-desktop { display: none !important; } .gov-bar-text { font-size: 11px !important; } }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ═══ UPGRADE 01: GOVERNMENT IDENTITY BAR ═══ */}
      <div style={{
        background: "#0A1628", height: 44, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 40px", zIndex: 1001, position: "sticky", top: 0,
      }}>
        <div className="gov-bar-text" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.80)" }}>
          🇱🇾 الجمهورية الليبية · حكومة الوحدة الوطنية
        </div>
        <div className="gov-bar-text" style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 400, fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
          وزارة الاقتصاد والتجارة · صندوق انطلاقة الرقمي
        </div>
      </div>

      {/* ═══ NAVBAR ═══ */}
      <nav style={{
        position: "sticky", top: 44, zIndex: 1000,
        borderBottom: "1px solid hsl(214,32%,91%)",
        background: scrolled ? "rgba(255,255,255,0.95)" : "#fff",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 72, maxWidth: 1280, margin: "0 auto", padding: "0 32px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SmallLogo size={40} />
            <div>
              <div style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 18, color: "#1B3A6B" }}>انطلاقة</div>
              <div style={{ fontSize: 11, color: "#64748B" }}>صندوق دعم الشركات الناشئة</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="nav-links-desktop">
            {navLinks.map(l => (
              <a key={l.href} href={l.href}
                className={`nav-link ${activeSection === l.href.slice(1) ? "active" : ""}`}
                style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 14, color: "#0F172A", textDecoration: "none" }}
              >{l.label}</a>
            ))}
          </div>
          <a href="#cta" style={{
            background: "linear-gradient(135deg, #2B5FC7, #00B4D8)", color: "#fff",
            padding: "10px 22px", borderRadius: 10, fontFamily: "'Cairo',sans-serif",
            fontWeight: 600, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap"
          }}>قدّم طلبك الآن</a>
        </div>
      </nav>

      {/* ═══ SECTION 01: HERO ═══ */}
      <section style={{ minHeight: "100vh", background: "#1B3A6B", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(43,95,199,0.4) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(0,180,216,0.2) 0%, transparent 55%)" }} />
        <div className="dot-pattern" style={{ position: "absolute", inset: 0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "80px 24px 0", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48 }}>
          <div style={{ flex: "1 1 55%", minWidth: 300 }}>
            <div className="animate" style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "#00B4D8", marginBottom: 16, fontFamily: "'Cairo',sans-serif" }}>
              01 · المنصة الوطنية للشركات الناشئة
            </div>
            <h1 className="animate" style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 900, fontSize: "clamp(36px,5vw,56px)", color: "#fff", lineHeight: 1.2, margin: "0 0 24px" }}>
              ليبيا الرقمية تبدأ من هنا.
            </h1>
            <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, maxWidth: 560, margin: "0 0 20px" }}>
              انطلاقة هي أول منصة رقمية حكومية في ليبيا لتمويل الشركات الناشئة — صُمِّمت لتحويل الأفكار الريادية إلى شركات ممولة ومرخصة وجاهزة للسوق، من خلال نظام ضمان سيادي، وتقييم مدعوم بالذكاء الاصطناعي، ومنظومة رقمية متكاملة.
            </p>
            <div className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 15, color: "#C9943A", marginBottom: 4 }}>
              من الفكرة إلى رأس المال التأسيسي في أيام — لا أشهر.
            </div>
            <div className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 13, color: "#C9943A", marginBottom: 40, opacity: 0.8 }}>
              بدعم حكومة الوحدة الوطنية · القرار رقم 23 لسنة 2025
            </div>

            <div className="animate" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
              <a href="#cta" className="cta-primary" style={{
                background: "linear-gradient(135deg, #6BCB3D, #00B4D8)", color: "#fff",
                padding: "16px 36px", borderRadius: 12, fontFamily: "'Noto Kufi Arabic',sans-serif",
                fontWeight: 700, fontSize: 17, textDecoration: "none",
                boxShadow: "0 8px 32px rgba(107,203,61,0.35)",
              }}>قدّم طلبك الآن ←</a>
              <a href="#how" style={{
                border: "2px solid rgba(255,255,255,0.35)", color: "#fff",
                padding: "16px 36px", borderRadius: 12, fontFamily: "'Cairo',sans-serif",
                fontWeight: 600, fontSize: 16, textDecoration: "none", background: "transparent",
                transition: "all 0.2s",
              }}>تعرّف على آلية العمل</a>
            </div>

            {/* Trust badges */}
            <div className="animate" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
              {[
                { icon: Landmark, text: "حكومة الوحدة الوطنية" },
                { icon: Scale, text: "القرار 23 · 2025" },
                { icon: Landmark, text: "مصرف ليبيا المركزي" },
              ].map((b, i) => (
                <span key={i} style={{
                  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 50, padding: "8px 18px", fontFamily: "'Cairo',sans-serif",
                  fontWeight: 500, fontSize: 13, color: "#fff", display: "flex", alignItems: "center", gap: 6,
                }}>
                  <b.icon size={14} /> {b.text}
                </span>
              ))}
            </div>

            {/* UPGRADE 05: Official seal row */}
            <div className="animate" style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(201,148,58,0.30)",
              borderRadius: 12, padding: "14px 28px", display: "flex", flexWrap: "wrap",
              gap: 32, justifyContent: "center", alignItems: "center",
            }}>
              {[
                { icon: BadgeCheck, color: "#C9943A", text: "منصة حكومية رسمية معتمدة" },
                { icon: Landmark, color: "#00B4D8", text: "مصرف ليبيا المركزي — شريك تنفيذي" },
                { icon: Award, color: "#6BCB3D", text: "مرخّصة بموجب القرار 23 لسنة 2025" },
              ].map((s, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.80)" }}>
                  <s.icon size={18} color={s.color} /> {s.text}
                </span>
              ))}
            </div>
          </div>

          {/* Logo column — big & organized, sits on the left of the hero */}
          <div style={{ flex: "1 1 38%", minWidth: 320, display: "flex", justifyContent: "center", order: 2 }}>
            <div
              className="logo-float"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "min(440px, 90%)",
                aspectRatio: "1 / 1",
              }}
            >
              {/* Outer glow ring */}
              <div style={{
                position: "absolute", inset: -20, borderRadius: "50%",
                background: "radial-gradient(circle at center, rgba(0,180,216,0.30) 0%, rgba(43,95,199,0.14) 45%, rgba(255,255,255,0) 72%)",
                filter: "blur(4px)",
              }} />
              {/* Dashed outer ring */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: "1px dashed rgba(255,255,255,0.18)",
              }} />
              {/* Gold hairline */}
              <div style={{
                position: "absolute", inset: 18, borderRadius: "50%",
                border: "1px solid rgba(201,148,58,0.55)",
              }} />
              {/* White card disc */}
              <div style={{
                position: "absolute", inset: 30, borderRadius: "50%",
                background: "linear-gradient(160deg, #ffffff 0%, #f4f8ff 100%)",
                boxShadow: "0 30px 70px -20px rgba(10,22,40,0.6), inset 0 0 0 1px rgba(27,58,107,0.08)",
              }} />
              {/* Top gold accent dot */}
              <div style={{
                position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)",
                width: 10, height: 10, borderRadius: "50%", background: "#C9943A",
                boxShadow: "0 0 16px rgba(201,148,58,0.9)",
              }} />
              {/* Bottom teal accent dot */}
              <div style={{
                position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)",
                width: 8, height: 8, borderRadius: "50%", background: "#00B4D8",
                boxShadow: "0 0 14px rgba(0,180,216,0.9)",
              }} />
              {/* Logo */}
              <img
                src={logoHero}
                alt="انطلاقة"
                style={{
                  position: "relative",
                  width: "88%",
                  height: "auto",
                  objectFit: "contain",
                  filter: "drop-shadow(0 10px 24px rgba(27,58,107,0.30))",
                }}
              />
            </div>
          </div>


        </div>

        {/* Stats bar */}
        <div ref={statsRef} style={{
          position: "relative", zIndex: 1, maxWidth: 1280, margin: "80px auto 0",
          display: "flex", justifyContent: "space-around", flexWrap: "wrap",
          padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.15)",
        }}>
          {[
            { val: stat1, label: "دينار ليبي · الحد الأقصى للتمويل" },
            { val: stat2, label: "مشروع مستهدف" },
            { val: stat3, label: "فرصة عمل سنة أولى" },
            { val: stat4, label: "قطاعاً استراتيجياً" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "16px 24px", borderLeft: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
              <div style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 800, fontSize: 36, color: "#00B4D8" }}>{s.val}</div>
              <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 02: THE PROBLEM ═══ */}
      <Section id="problem" bg="#F7F8FC" watermark>
        <SectionLabel num="02">التحدي</SectionLabel>
        <Headline>الفرصة كانت دائماً موجودة. المسار لم يكن.</Headline>
        <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 17, color: "#64748B", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 56px", textAlign: "center" }}>
          ليبيا بلد تزخر بثروات طبيعية استثنائية، وكفاءات شابة، وقطاعات اقتصادية لم تُستثمر بعد. غير أن جيلاً كاملاً من المبتكرين الليبيين اصطدم دائماً بأربعة عوائق متجذّرة تحول دون تحويل أفكارهم إلى شركات فعلية.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
          {problems.map((p, i) => (
            <div key={i} className="animate card-hover" style={{
              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: 32,
              borderRight: "4px solid #EF4444", transitionDelay: `${i * 0.1}s`,
            }}>
              <div style={{ marginBottom: 12 }}><IC icon={p.icon} color="#EF4444" /></div>
              <h3 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 20, color: "#0F172A", marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 15, color: "#64748B", lineHeight: 1.8 }}>{p.body}</p>
            </div>
          ))}
        </div>
        <div className="animate" style={{ background: "linear-gradient(135deg, #1B3A6B, #2B6BE8)", borderRadius: 16, padding: "28px 40px", textAlign: "center" }}>
          <span style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 600, fontSize: 18, color: "#fff" }}>
            انطلاقة بُنيت لإزالة كل هذه العوائق — في آنٍ واحد.
          </span>
        </div>
      </Section>

      {/* ═══ SECTION 03: WHAT IS ANTALQA ═══ */}
      <Section id="what" bg="#fff">
        <SectionLabel num="03">ما هي انطلاقة؟</SectionLabel>
        <Headline>منصة وطنية. لا مجرد بوابة تمويل.</Headline>
        <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 17, color: "#64748B", lineHeight: 1.8, maxWidth: 780, margin: "0 auto 64px", textAlign: "center" }}>
          انطلاقة — صندوق دعم وضمان تمويل الشركات الناشئة — مؤسسة أُنشئت بموجب قرار رئيس مجلس الوزراء رقم 23 لسنة 2025، وتتبع مجلس الوزراء لحكومة الوحدة الوطنية مباشرة. تتمتع بالشخصية الاعتبارية والذمة المالية المستقلة، ومقرها الرئيسي طرابلس.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {whatCards.map((c, i) => (
            <div key={i} className="animate card-hover" style={{
              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: 36,
              borderRight: "4px solid #00B4D8", transitionDelay: `${i * 0.1}s`,
            }}>
              <div style={{ marginBottom: 16 }}><IC icon={c.icon} size={36} /></div>
              <h3 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 19, color: "#0F172A", marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 15, color: "#64748B", lineHeight: 1.8 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SECTION 04: HOW IT WORKS ═══ */}
      <Section id="how" bg="#F7F8FC">
        <SectionLabel num="04">رحلة المستخدم</SectionLabel>
        <Headline>من التقديم إلى رأس المال في خمس خطوات منظّمة</Headline>
        <div style={{ position: "relative", maxWidth: 700, margin: "56px auto 0" }}>
          <div className="timeline-line" style={{ position: "absolute", right: 25, top: 0, bottom: 0, width: 3, borderRadius: 2 }} />
          {steps.map((s, i) => (
            <div key={i} className="animate" style={{ display: "flex", gap: 24, marginBottom: 40, position: "relative", transitionDelay: `${i * 0.12}s` }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #2B5FC7, #00B4D8, #6BCB3D)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 800, fontSize: 20,
                position: "relative", zIndex: 1,
              }}>
                <IC icon={stepIcons[i]} size={24} color="#fff" />
              </div>
              <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: 32, flex: 1 }}>
                <span style={{ background: "#00B4D815", color: "#00B4D8", borderRadius: 50, padding: "4px 14px", fontFamily: "'Cairo',sans-serif", fontSize: 12, fontWeight: 600 }}>{s.time}</span>
                <h3 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 20, color: "#0F172A", margin: "12px 0 8px" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 15, color: "#64748B", lineHeight: 1.8 }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SECTION 05: EVALUATION ENGINE ═══ */}
      <Section id="evaluation" bg="#1B3A6B">
        <SectionLabel num="05">نظام التقييم الذكي</SectionLabel>
        <Headline light>العدالة ليست قيمة. إنها خوارزمية.</Headline>
        <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 56px", textAlign: "center" }}>
          يُقيّم محرك الذكاء الاصطناعي في انطلاقة كل طلب وفق خمسة أبعاد موزونة — مُعايَرة وفق أولويات ليبيا الاقتصادية الوطنية، ومعدَّلة ديناميكياً بحسب القطاع، لضمان ألا يُحكَم على شركة ناشئة في تكنولوجيا التعدين بمعايير شركة ناشئة في الاقتصاد الإبداعي.
        </p>

        <div ref={donutRef} style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
          <div style={{ flex: "1 1 300px", textAlign: "center" }}>
            <svg viewBox="0 0 200 200" width="260" height="260" style={{ margin: "0 auto", display: "block" }}>
              {(() => {
                let offset = 0;
                return donutSegments.map((seg, i) => {
                  const arcLen = (seg.pct / 100) * circumference;
                  const el = (
                    <circle key={i} className="donut-arc" cx="100" cy="100" r={radius} fill="none"
                      stroke={seg.color} strokeWidth="14"
                      strokeDasharray={donutVisible ? `${arcLen} ${circumference - arcLen}` : `0 ${circumference}`}
                      strokeDashoffset={-offset} strokeLinecap="round"
                      transform="rotate(-90 100 100)"
                      style={{ transitionDelay: `${i * 0.15}s` }}
                    />
                  );
                  offset += arcLen;
                  return el;
                });
              })()}
              <text x="100" y="96" textAnchor="middle" fill="#C9943A" fontFamily="Noto Kufi Arabic" fontWeight="800" fontSize="32">100</text>
              <text x="100" y="116" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontFamily="Cairo" fontSize="14">درجة</text>
            </svg>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 24 }}>
              {donutSegments.map((s, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "'Cairo',sans-serif" }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, display: "inline-block" }} />
                  {s.label} {s.pct}%
                </span>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: 12 }}>
            {evalDimensions.map((d, i) => (
              <div key={i} className="animate" style={{
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16,
                transitionDelay: `${i * 0.1}s`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 80 }}>
                  <IC icon={evalIcons[i]} size={20} color={d.color} />
                  <span style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 800, fontSize: 22, color: d.color }}>{d.pct}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 17, color: "#fff" }}>{d.title}</div>
                  <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{d.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginTop: 56 }}>
          {[
            { range: "85 — 100", title: "مشروع استراتيجي", body: "أولوية قصوى في التمويل والإعفاءات والدعم الكامل", color: "#6BCB3D" },
            { range: "70 — 84", title: "مشروع واعد", body: "الأهلية للحاضنات والمسرّعات ودعم المادة 13", color: "#F5C842" },
            { range: "أقل من 70", title: "قيد التطوير", body: "توجيه مهني منظّم وإرشاد قبل إعادة التقديم", color: "#94A3B8" },
          ].map((c, i) => (
            <div key={i} className="animate" style={{
              background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 28,
              borderTop: `4px solid ${c.color}`, transitionDelay: `${i * 0.1}s`,
            }}>
              <div style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 800, fontSize: 24, color: c.color }}>{c.range}</div>
              <div style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", margin: "8px 0 4px" }}>{c.title}</div>
              <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)" }}>{c.body}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SECTION 06: SECTORS ═══ */}
      <Section id="sectors" bg="#fff" watermark>
        <SectionLabel num="06">القطاعات الاستراتيجية</SectionLabel>
        <Headline>أحد عشر قطاعاً استراتيجياً. هدف وطني واحد.</Headline>
        <div className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 18, color: "#C9943A", fontWeight: 500, marginBottom: 8 }}>التنويع، البناء، التصدير.</div>
        <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 16, color: "#64748B", maxWidth: 740, margin: "0 auto 56px", textAlign: "center", lineHeight: 1.8 }}>
          منظومة الشركات الناشئة في انطلاقة موجّهة بدقة نحو القطاعات التي تُعرِّف اقتصاد المعرفة القادر على تقليص الاعتماد النفطي. كل قطاع مُعرَّف رسمياً بموجب القرار رقم 81 لسنة 2025.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {sectors.map((s, i) => (
            <div key={i} className="animate card-hover sector-card" style={{
              border: "1px solid #E2E8F0", borderRadius: 16, padding: 28, background: "#fff",
              cursor: "pointer", transition: "all 0.25s", transitionDelay: `${i * 0.05}s`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <IC icon={sectorIcons[i]} size={36} color={s.badgeColor} />
                <span style={{ fontSize: 12, color: "#64748B" }}>{s.num}</span>
              </div>
              <h3 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 17, color: "#0F172A", marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 13, color: "#64748B", marginBottom: 12 }}>{s.desc}</p>
              <span style={{
                background: `${s.badgeColor}18`, color: s.badgeColor, borderRadius: 50,
                padding: "4px 12px", fontFamily: "'Cairo',sans-serif", fontSize: 12, fontWeight: 600,
              }}>{s.badge}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SECTION 07: FINANCING ═══ */}
      <Section id="financing" bg="linear-gradient(160deg, #F0F7FF 0%, #E8FFF5 100%)">
        <SectionLabel num="07">تفاصيل التمويل</SectionLabel>
        <Headline>رأس مال حقيقي. شروط منظّمة. مضمون حكومياً.</Headline>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, marginTop: 48 }}>
          <div style={{ flex: "1 1 360px" }}>
            {[
              { num: "150,000", label: "دينار ليبي · الحد الأقصى للتمويل الانطلاقي" },
              { num: "50,000", label: "دينار ليبي · الدفعة الأولى" },
              { num: "8 سنوات", label: "الحد الأقصى لفترة السداد" },
              { num: "60%", label: "الحد الأدنى للمحتوى المحلي المطلوب" },
              { num: "85/100", label: "الحد الأدنى لدرجة التقييم للتنافس على التمويل" },
            ].map((s, i) => (
              <div key={i} className="animate" style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "2px solid #C9943A20", transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 800, fontSize: 48, color: "#1B3A6B" }}>{s.num}</div>
                <div style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 15, color: "#64748B" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <h3 className="animate" style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 22, color: "#0F172A", marginBottom: 20 }}>ما يشمله التمويل</h3>
            {[
              "تطوير النماذج الأولية وبناء المنتج",
              "شراء المواد والمدخلات الإنتاجية",
              "دخول السوق وأنشطة الإطلاق",
              "اقتناء البرمجيات والأجهزة التقنية",
              "التوظيف وبناء الفريق التأسيسي",
              "تكاليف الإعداد التشغيلي",
            ].map((item, i) => (
              <div key={i} className="animate" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, transitionDelay: `${i * 0.08}s` }}>
                <CheckCircle2 size={18} color="#6BCB3D" />
                <span style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 15, color: "#0F172A" }}>{item}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #E2E8F0", margin: "28px 0", paddingTop: 28 }}>
              <h3 className="animate" style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 22, color: "#0F172A", marginBottom: 12 }}>قناة الصرف</h3>
              <div className="animate" style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <span style={{ background: "#00B4D810", color: "#00B4D8", borderRadius: 50, padding: "6px 16px", fontFamily: "'Cairo',sans-serif", fontSize: 13, fontWeight: 600 }}>LYPay</span>
                <span style={{ background: "#1B3A6B10", color: "#1B3A6B", borderRadius: 50, padding: "6px 16px", fontFamily: "'Cairo',sans-serif", fontSize: 13, fontWeight: 600 }}>مصرف ليبيا المركزي</span>
              </div>
              <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 14, color: "#64748B", lineHeight: 1.8 }}>
                تُحوَّل الأموال مباشرةً إلى حساب المؤسس عبر بوابة الدفع الوطنية LYPay بالتنسيق مع مصرف ليبيا المركزي.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ SECTION 08: STAKEHOLDER TABS ═══ */}
      <Section id="stakeholders" bg="#fff">
        <SectionLabel num="08">من تخدم انطلاقة؟</SectionLabel>
        <Headline>كل طرف يكسب. كل عائق يسقط.</Headline>
        <div className="animate" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {tabData.map((t, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              padding: "10px 24px", borderRadius: 50, border: i === activeTab ? "none" : "1px solid #E2E8F0",
              background: i === activeTab ? "#1B3A6B" : "#F7F8FC",
              color: i === activeTab ? "#fff" : "#64748B",
              fontFamily: "'Cairo',sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer",
              transition: "all 0.2s",
            }}>{t.label}</button>
          ))}
        </div>
        {tabData.map((t, i) => (
          <div key={i} style={{ display: activeTab === i ? "block" : "none", opacity: activeTab === i ? 1 : 0, transition: "opacity 0.3s ease" }}>
            <h3 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 28, color: "#0F172A", marginBottom: 16 }}>{t.headline}</h3>
            <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 16, color: "#64748B", lineHeight: 1.8, marginBottom: 24, maxWidth: 700 }}>{t.intro}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
              {t.pills.map((p, j) => (
                <span key={j} style={{
                  background: `${t.pillColor}15`, border: `1px solid ${t.pillColor}30`,
                  color: t.pillColor, borderRadius: 50, padding: "6px 16px",
                  fontFamily: "'Cairo',sans-serif", fontSize: 13, fontWeight: 500,
                }}>{p}</span>
              ))}
            </div>
            {i === 0 && (
              <a href="#cta" style={{
                background: "#2B5FC7", color: "#fff", padding: "12px 28px", borderRadius: 10,
                fontFamily: "'Cairo',sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none",
                display: "inline-block",
              }}>ابدأ طلبك ←</a>
            )}
          </div>
        ))}
      </Section>

      {/* ═══ SECTION 09: LEGAL ═══ */}
      <Section id="legal" bg="#F7F8FC">
        <SectionLabel num="09">الأساس القانوني</SectionLabel>
        <Headline>مبنيٌّ على القانون. محكومٌ بالسياسة. مساءلٌ للوطن.</Headline>
        <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 17, color: "#64748B", lineHeight: 1.8, maxWidth: 700, margin: "0 auto 48px", textAlign: "center" }}>
          انطلاقة ليست مبادرة — إنها مؤسسة قانونية راسخة. كل بُعد من أبعاد عملها مُقنَّن في وثائق قانونية رسمية أصدرتها حكومة الوحدة الوطنية.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 32 }}>
          {[
            { num: "23", icon: Gavel, labelText: "القرار التأسيسي", labelColor: "#C9943A", title: "القرار رقم 23 لسنة 2025", subtitle: "إنشاء صندوق انطلاقة", body: "أسّس الصندوق بوصفه كياناً قانونياً مستقلاً بذمة مالية منفصلة، يتبع مجلس الوزراء مباشرةً، بحد تمويلي أقصى 150,000 دينار، ودفعة أولى 50,000 دينار، وفترة سداد لا تتجاوز ثماني سنوات." },
            { num: "81", icon: NotebookPen, labelText: "اللائحة التنظيمية", labelColor: "#2B5FC7", title: "القرار رقم 81 لسنة 2025", subtitle: "لائحة دعم وتنظيم الشركات الناشئة", body: "يُعرّف معايير أهلية الشركات الناشئة، والقطاعات المؤهلة، ومستويات الابتكار، وعتبة المحتوى المحلي 60%، وبنية خوارزمية التقييم، وشروط الكفيل، وآلية الرخصة المؤقتة." },
          ].map((c, i) => (
            <div key={i} className="animate card-hover" style={{
              background: "#fff", borderRadius: 20, border: "1px solid #E2E8F0", padding: 40,
              position: "relative", overflow: "hidden", transitionDelay: `${i * 0.15}s`,
            }}>
              <div style={{ position: "absolute", top: -20, left: 20, fontFamily: "'Noto Kufi Arabic',sans-serif", fontSize: 160, fontWeight: 800, color: "#1B3A6B", opacity: 0.04 }}>{c.num}</div>
              <div style={{ marginBottom: 16 }}><IC icon={c.icon} size={40} color={c.labelColor} /></div>
              <span style={{ background: `${c.labelColor}15`, color: c.labelColor, borderRadius: 50, padding: "4px 14px", fontFamily: "'Cairo',sans-serif", fontSize: 12, fontWeight: 600 }}>{c.labelText}</span>
              <h3 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 22, color: "#0F172A", margin: "16px 0 4px" }}>{c.title}</h3>
              <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: 14, color: "#64748B", marginBottom: 12 }}>{c.subtitle}</div>
              <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 15, color: "#64748B", lineHeight: 1.8 }}>{c.body}</p>
            </div>
          ))}
        </div>

        <div className="animate" style={{
          background: "#1B3A6B", borderRadius: 16, padding: "24px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 48,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FileText size={20} color="#fff" />
            <span style={{ fontFamily: "'Cairo',sans-serif", fontWeight: 600, fontSize: 16, color: "#fff" }}>اقرأ النص القانوني الكامل للقرار رقم 81 لسنة 2025</span>
          </div>
          <a href="https://lawsociety.ly/legislation/قرار-رقم-81-لسنة-2025-م-بشأن-اعتماد-لائحة-تنظ/" target="_blank" rel="noopener noreferrer" style={{
            border: "2px solid #C9943A", color: "#C9943A", borderRadius: 10, padding: "10px 24px",
            fontFamily: "'Cairo',sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none",
            display: "flex", alignItems: "center", gap: 6,
          }}><ExternalLink size={14} /> عرض الوثيقة القانونية</a>
        </div>

        <h3 className="animate" style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 24, color: "#0F172A", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
          <IC icon={Users} size={24} color="#1B3A6B" /> مجلس الأمناء
        </h3>
        <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 15, color: "#64748B", marginBottom: 24 }}>يتضمن مجلس الأمناء أعلى المستويات الحكومية لضمان توافق قرارات الصندوق مع السياسة الوطنية.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {boardMembers.map((m, i) => (
            <span key={i} className="animate" style={{
              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 50,
              padding: "8px 20px", fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 14, color: "#0F172A",
              transitionDelay: `${i * 0.05}s`,
            }}>{m}</span>
          ))}
        </div>
      </Section>

      {/* ═══ SECTION 10: ECONOMIC IMPACT ═══ */}
      <Section id="impact" bg="#1B3A6B">
        <SectionLabel num="10">الأثر الاقتصادي المتوقع</SectionLabel>
        <Headline light>الأرقام خلف الرؤية</Headline>
        <div className="animate" style={{ borderRight: "4px solid #C9943A", paddingRight: 28, maxWidth: 680, margin: "0 auto 64px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cairo',sans-serif", fontStyle: "italic", fontSize: 18, color: "rgba(255,255,255,0.80)", lineHeight: 1.8 }}>
            "هذا ليس صندوقاً. إنه أساس."
          </p>
        </div>

        <div ref={impactRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 56 }}>
          {[
            { val: impact1, label: "مشروع مبتكر مدعوم بالتمويل والحضانة" },
            { val: impact2, label: "فرصة عمل مباشرة وغير مباشرة في السنة الأولى" },
            { val: "500M", label: "دينار ليبي إضافة للناتج المحلي الإجمالي" },
            { val: "500K", label: "مستخدم في المسار الطويل الأمد" },
            { val: "100M+", label: "دينار ليبي إجمالي التمويل المُنصرَف" },
          ].map((s, i) => (
            <div key={i} className="animate" style={{
              background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 36,
              border: "1px solid rgba(255,255,255,0.10)", transitionDelay: `${i * 0.1}s`,
            }}>
              <div style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 800, fontSize: 52, background: "linear-gradient(135deg, #00B4D8, #6BCB3D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.val}</div>
              <div style={{ fontFamily: "'Cairo',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.70)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {[
            { period: "المدى القصير — 6 أشهر", badge: "الهدف: +10,000 مستخدم", items: ["الوصول إلى 10,000 مستخدم مسجّل نشط", "توسيع شبكة التكامل المصرفي", "معالجة الدفعة الأولى من الطلبات الاستراتيجية"] },
            { period: "المدى المتوسط — السنة الثانية", badge: "الهدف: +50,000 مستخدم", items: ["إطلاق تطبيق جوال متكامل", "توسيع شبكة الحاضنات وطنياً", "أدوات تمويل إضافية تتبّعي", "أطر شراكة الاستثمار الدولي"] },
            { period: "المدى الطويل — 3 إلى 5 سنوات", badge: "الهدف: +500,000 مستخدم", items: ["500,000 مستخدم عبر ليبيا", "توسع إقليمي في الخدمات", "صندوق استثماري لخرّيجي انطلاقة", "تصدير حلول تقنية ليبية للمنطقة"] },
          ].map((r, i) => (
            <div key={i} className="animate" style={{
              background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 28,
              transitionDelay: `${i * 0.1}s`,
            }}>
              <h4 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 12 }}>{r.period}</h4>
              <span style={{ background: "#00B4D815", color: "#00B4D8", borderRadius: 50, padding: "4px 14px", fontFamily: "'Cairo',sans-serif", fontSize: 12, fontWeight: 600, display: "inline-block", marginBottom: 16 }}>{r.badge}</span>
              {r.items.map((item, j) => (
                <p key={j} style={{ fontFamily: "'Cairo',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.70)", lineHeight: 1.8 }}>· {item}</p>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SECTION 11: ELIGIBILITY ═══ */}
      <Section id="eligibility" bg="#fff" watermark>
        <SectionLabel num="11">شروط الأهلية</SectionLabel>
        <Headline>من يتأهل؟ وما المطلوب؟</Headline>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 40 }}>
          {eligibility.map((e, i) => (
            <div key={i} className="animate card-hover" style={{
              border: "1px solid #E2E8F0", borderRadius: 16, borderRight: "4px solid #00B4D8",
              padding: 32, background: "#fff", transitionDelay: `${i * 0.1}s`,
            }}>
              <h3 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 20, color: "#0F172A", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <IC icon={eligibilityIcons[i]} size={24} color="#00B4D8" /> {e.title}
              </h3>
              {e.items.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 8, marginBottom: 10, fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 15, color: "#0F172A" }}>
                  <CheckCircle2 size={16} color="#6BCB3D" style={{ flexShrink: 0, marginTop: 4 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SECTION 12: SECURITY ═══ */}
      <Section id="security" bg="#F7F8FC">
        <SectionLabel num="12">الأمان والثقة</SectionLabel>
        <Headline>بياناتك سيادية. مسارك شفاف.</Headline>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 40 }}>
          {securityCards.map((c, i) => (
            <div key={i} className="animate card-hover" style={{
              background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0",
              padding: 32, textAlign: "center", transitionDelay: `${i * 0.1}s`,
            }}>
              <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}><IC icon={c.icon} size={40} color="#00B4D8" /></div>
              <h3 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 20, color: "#0F172A", marginBottom: 16 }}>{c.title}</h3>
              {c.items.map((item, j) => (
                <p key={j} style={{ fontFamily: "'Cairo',sans-serif", fontSize: 14, color: "#64748B", lineHeight: 1.8 }}>{item}</p>
              ))}
              <span style={{ display: "inline-block", marginTop: 16, background: "#00B4D810", color: "#00B4D8", borderRadius: 50, padding: "4px 14px", fontFamily: "'Cairo',sans-serif", fontSize: 12, fontWeight: 600 }}>{c.badge}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SECTION 13: FAQ ═══ */}
      <Section id="faq" bg="#fff">
        <SectionLabel num="13">الأسئلة الشائعة</SectionLabel>
        <Headline>الأسئلة الأكثر شيوعاً</Headline>
        <div style={{ maxWidth: 780, margin: "40px auto 0" }}>
          {faqData.map((f, i) => (
            <div key={i} className="animate" style={{ borderBottom: "1px solid #E2E8F0", transitionDelay: `${i * 0.08}s` }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", padding: "20px 0", background: "none", border: "none", cursor: "pointer",
              }}>
                <span style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 600, fontSize: 17, color: "#0F172A", textAlign: "right" }}>{f.q}</span>
                <ChevronDown size={20} color="#2B5FC7" style={{
                  flexShrink: 0, marginRight: 16,
                  transition: "transform 0.3s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)",
                }} />
              </button>
              <div style={{
                maxHeight: openFaq === i ? 300 : 0, overflow: "hidden",
                transition: "max-height 0.35s ease", paddingBottom: openFaq === i ? 20 : 0,
              }}>
                <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 15, color: "#64748B", lineHeight: 1.8 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══ SECTION 14: FINAL CTA ═══ */}
      <section id="cta" style={{
        background: "linear-gradient(160deg, #1B3A6B 0%, #0D2347 100%)",
        padding: "96px 24px", position: "relative", overflow: "hidden",
      }}>
        <div className="dot-pattern" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div className="logo-float" style={{ marginBottom: 32, display: "inline-block" }}>
            <AntalqaLogo size={60} />
          </div>
          <h2 className="animate" style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 900, fontSize: "clamp(32px,5vw,52px)", color: "#fff", lineHeight: 1.15, marginBottom: 24 }}>
            فكرتك تستحق بنية تحتية.
          </h2>
          <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 40 }}>
            لن تظهر الجيل القادم من شركات التكنولوجيا الليبية بالصدفة. ستُبنى — بتأنٍّ وبنيان، وبكامل ثقل السياسة الوطنية خلفها. انطلاقة هي ذلك البنيان.
          </p>

          <div className="animate" style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="#" style={{
              background: "linear-gradient(135deg, #C9943A, #F5C842)", color: "#1B3A6B",
              padding: "16px 40px", borderRadius: 12, fontFamily: "'Noto Kufi Arabic',sans-serif",
              fontWeight: 700, fontSize: 17, textDecoration: "none",
              boxShadow: "0 8px 32px rgba(201,148,58,0.40)",
            }}>ابدأ طلبك الآن ←</a>
            <a href="#legal" style={{
              border: "2px solid rgba(255,255,255,0.30)", color: "#fff",
              padding: "16px 32px", borderRadius: 12, fontFamily: "'Cairo',sans-serif",
              fontWeight: 600, fontSize: 15, textDecoration: "none",
            }}>تعرّف على الإطار التنظيمي</a>
            <a href="#" style={{
              color: "#00B4D8", fontFamily: "'Cairo',sans-serif", fontWeight: 500, fontSize: 15,
              textDecoration: "underline dotted", padding: "16px 12px",
            }}>تواصل معنا للشراكات ←</a>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", margin: "0 0 48px", paddingTop: 48 }}>
            <h3 className="animate" style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 24, color: "#fff", marginBottom: 12 }}>
              هل أنت مستعد لأن تكون جزءاً من بنية ليبيا الابتكارية؟
            </h3>
            <p className="animate" style={{ fontFamily: "'Cairo',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto 24px" }}>
              تسعى انطلاقة إلى توسيع شبكتها من الحاضنات المعتمدة والمصارف الشريكة والمستثمرين المؤسسيين.
            </p>
            <a href="#" style={{
              border: "2px solid #00B4D8", color: "#00B4D8", borderRadius: 10,
              padding: "12px 28px", fontFamily: "'Cairo',sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none",
            }}>استكشف فرص الشراكة ←</a>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 15: FOOTER ═══ */}
      <footer style={{ background: "#0A1628", padding: "64px 24px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, paddingBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <SmallLogo size={48} />
              <span style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 700, fontSize: 22, color: "#fff" }}>انطلاقة</span>
            </div>
            <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.50)", lineHeight: 1.8 }}>
              صندوق دعم وضمان تمويل الشركات الناشئة<br />
              حكومة الوحدة الوطنية · وزارة الاقتصاد والتجارة<br />
              طرابلس، ليبيا
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.40)", marginBottom: 16 }}>روابط سريعة</h4>
            {["كيف تعمل", "القطاعات الاستراتيجية", "تفاصيل التمويل", "شروط الأهلية", "الأسئلة الشائعة", "قدّم طلبك"].map(l => (
              <a key={l} href={`#${l === "كيف تعمل" ? "how" : l === "القطاعات الاستراتيجية" ? "sectors" : l === "تفاصيل التمويل" ? "financing" : l === "شروط الأهلية" ? "eligibility" : l === "الأسئلة الشائعة" ? "faq" : "cta"}`}
                style={{ display: "block", fontFamily: "'Cairo',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", textDecoration: "none", lineHeight: 2.2 }}
              >{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.40)", marginBottom: 16 }}>الأساس القانوني</h4>
            <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 2 }}>
              القرار رقم 23 لسنة 2025 — إنشاء الصندوق<br />
              القرار رقم 81 لسنة 2025 — اللائحة التنظيمية
            </p>
            <a href="https://lawsociety.ly/legislation/قرار-رقم-81-لسنة-2025-م-بشأن-اعتماد-لائحة-تنظ/" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Cairo',sans-serif", fontSize: 14, color: "#C9943A", textDecoration: "underline" }}>النص القانوني الكامل ←</a>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Noto Kufi Arabic',sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.40)", marginBottom: 16 }}>الشريك التقني</h4>
            <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 2 }}>
              شركة الابتكار الرقمي الحديثة<br />
              Ebtekar Raqmi Co.<br />
              info@ebtekarraqmi.com
            </p>
            <a href="https://www.ebtekarraqmi.com" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Cairo',sans-serif", fontSize: 14, color: "#00B4D8" }}>www.ebtekarraqmi.com</a>
          </div>
        </div>

        {/* UPGRADE 07: Footer government seal */}
        <div style={{
          maxWidth: 1280, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "32px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.15)" }} />
            <SmallLogo size={32} />
            <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.15)" }} />
          </div>
          <p style={{ fontFamily: "'Cairo',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.40)", textAlign: "center", maxWidth: 600, lineHeight: 1.8 }}>
            هذه المنصة ملك للدولة الليبية وتُدار بموجب القرار رقم 23 لسنة 2025 الصادر عن رئيس مجلس الوزراء — حكومة الوحدة الوطنية
          </p>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)", maxWidth: 1280, margin: "0 auto",
          padding: "24px 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: "'Cairo',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            © 2025 صندوق انطلاقة — حكومة الوحدة الوطنية، ليبيا. جميع الحقوق محفوظة.
          </span>
          <span style={{ fontFamily: "'Cairo',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            تخضع جميع قرارات التمويل لمعايير القرار رقم 81 لسنة 2025
          </span>
        </div>
      </footer>
    </>
  );
};

export default Index;
