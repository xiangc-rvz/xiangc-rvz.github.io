export type ProjectLang = "en" | "cn";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | {
      type: "numbered";
      items: { title: string; body: string }[];
      start?: number;
    }
  | { type: "bullets"; items: string[] }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      width: number;
      height: number;
      /** Constrain tall media (e.g. phone screenshots) to match landscape figure height */
      layout?: "phone" | "medium";
      controls?: boolean;
      loop?: boolean;
    }
  | {
      type: "mediaRow";
      items: {
        src: string;
        alt: string;
        width: number;
        height: number;
      }[];
      caption?: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "code";
      label?: string;
      text: string;
    }
  | {
      type: "infoCards";
      cards: {
        title: string;
        items: string[];
        footer: string;
      }[];
    }
  | {
      type: "architectureFlow";
      caption: string;
      realWorld: string;
      inputs: { title: string; subtitle?: string; emphasize?: boolean }[];
      /** Label on the arrow after AI Understanding — not a boxed step. */
      transferLabel: string;
      stages: { title: string; subtitle?: string; emphasize?: boolean }[];
      branch: {
        left: { title: string; subtitle?: string; emphasize?: boolean }[];
        right: { title: string; subtitle?: string; emphasize?: boolean };
      };
      loopNote: string;
    };

export type ProjectSection = {
  id: string;
  level: 1 | 2;
  number: string;
  title: string;
  blocks: ContentBlock[];
};

export type ProjectCopy = {
  title: string;
  description: string;
  tags?: string[];
  advisor?: string;
  /** Optional project timeline lines shown under tags (e.g. year · context). */
  timeline?: string[];
  sections: ProjectSection[];
};

export type Project = {
  slug: string;
  image: string;
  imageAlt: string;
  /** When false, omitted from homepage Project grid (still has a detail page). */
  showInHomeGrid?: boolean;
  en: ProjectCopy;
  cn: ProjectCopy;
};

const redditGrowthOsCn: ProjectCopy = {
  title: "Reddit Growth OS",
  description: "把 Reddit 上的需求表达转化为可执行的获客动作",
  tags: ["AI 产品", "0→1 增长", "Vibecoding"],
  sections: [
    {
      id: "product-definition",
      level: 1,
      number: "1.",
      title: "产品定义",
      blocks: [
        {
          type: "paragraph",
          text: "Reddit Growth OS 是一个面向 0→1 产品的 Reddit 获客研究与复盘工作台。它帮助用户从模糊产品描述出发，自动派生潜在用户的情境表达，在 Reddit 全平台寻找真实需求帖子，并把机会转化为可执行的互动、发帖和复盘资产。",
        },
      ],
    },
    {
      id: "project-background",
      level: 1,
      number: "2.",
      title: "项目背景",
      blocks: [
        {
          type: "paragraph",
          text: "我在一家美国 AI startup 做 Reddit 增长时，曾通过运营在一周内带来 200+ 用户和 30K+ 自然流量。这个过程中我发现，Reddit 对海外产品冷启动很重要，但对 0→1 产品尤其难：平台由几百万个兴趣社区组成，每个社区都有自己的语言、规则和隐性边界。运营者真正困难的不是“发帖”，而是两件事：",
        },
        {
          type: "numbered",
          items: [
            {
              title: "找不到对的人",
              body: "早期产品用户画像不清晰，团队容易从产品品类出发找社区，结果进入看似相关、实则低转化的 subreddit。",
            },
            {
              title: "增长行为无法沉淀",
              body: "在哪个社区、用什么角度、发了什么内容、效果如何，往往散落在表格和个人记忆里，很难复盘“到底什么有效”。",
            },
          ],
        },
        {
          type: "paragraph",
          text: "因此我把问题拆成两层：先解决“如何找到真实需求发生的地方”，再解决“如何把 Reddit 运营变成可复盘资产”。",
        },
      ],
    },
    {
      id: "core-insight",
      level: 1,
      number: "3.",
      title: "核心洞察",
      blocks: [
        {
          type: "bullets",
          items: [
            "现有 Reddit 获客工具大多基于关键词、竞品或 SEO 匹配：输入产品和竞品，系统找相似社区和相似帖子。这对成熟产品有效，因为成熟产品有明确品类、竞品和关键词。",
            "但 0→1 产品的问题不同。早期产品往往只有一个模糊想法，用户画像本身尚未稳定；更关键的是，真实用户不一定聚集在产品品类社区里，而是分散在需求发生的情境社区中。",
            "以 AI 陪伴产品为例，常规工具会推荐 AI、chatbot 类 subreddit，但实际转化很弱。真实需求反而出现在看似无关的场景里：例如游戏玩家讨论“一个人打游戏很空，希望有人陪”。这类信号无法通过“产品品类 → subreddit”找到，只能通过“用户情境 → 需求表达”倒推。",
          ],
        },
        {
          type: "paragraph",
          text: "因此系统的设计起点是：",
        },
        {
          type: "quote",
          text: "从产品匹配，转向情境倒推",
        },
      ],
    },
    {
      id: "product-architecture",
      level: 1,
      number: "4.",
      title: "产品架构",
      blocks: [
        {
          type: "paragraph",
          text: "产品分为四个模块：",
        },
        {
          type: "numbered",
          items: [
            {
              title: "Product Brief：把模糊想法变成可研究的产品语境",
              body: "用户输入产品描述、目标用户、竞品或官网。AI 通过追问帮助用户把产品说清楚：它解决什么问题、适合谁、在什么场景下被使用、和现有替代方案有什么不同。系统会把用户的自然语言描述整理成更具体的产品语境，为后续的情境关键词派生和 Reddit 检索提供基础。",
            },
            {
              title: "Growth Research：从产品语境倒推出真实需求场景",
              body: "系统从产品描述中派生情境关键词，在 Reddit 全平台寻找真实帖子，并对结果按相关性、时效性、需求强度和互动活跃度进行排序。最终产出潜在的获客社区列表和机会帖子列表。",
            },
            {
              title: "Action Workspace：把机会转化成可执行的互动动作",
              body: "基于机会帖子生成回复角度、发帖草稿或可模仿内容结构承接用户。",
            },
            {
              title: "Dashboard / Audience：把 Reddit 运营沉淀成可复盘资产",
              body: "追踪账号发布表现、社区表现、评论者线索和潜在用户画像，沉淀为可复盘的增长资产。",
            },
          ],
        },
      ],
    },
  ],
};

const redditGrowthOsEn: ProjectCopy = {
  title: "Reddit Growth OS",
  description:
    "Turn demand expressions on Reddit into executable acquisition actions",
  tags: ["AI Product", "0-to-1 Growth", "Vibecoding"],
  sections: [
    {
      id: "product-definition",
      level: 1,
      number: "1.",
      title: "Product Definition",
      blocks: [
        {
          type: "paragraph",
          text: "Reddit Growth OS is a Reddit acquisition research and retro workstation for 0→1 products. It helps users start from a fuzzy product description, automatically derive situational expressions of potential users, find real demand posts across Reddit, and turn opportunities into executable interactions, posts, and reviewable assets.",
        },
      ],
    },
    {
      id: "project-background",
      level: 1,
      number: "2.",
      title: "Project Background",
      blocks: [
        {
          type: "paragraph",
          text: "While doing Reddit growth at a U.S. AI startup, I once brought in 200+ users and 30K+ organic traffic in a week through operations. That experience made something clear: Reddit matters a lot for overseas product cold starts, but it is especially hard for 0→1 products. The platform is made of millions of interest communities, each with its own language, rules, and unspoken boundaries. The real difficulty for operators is not “posting.” It is two things:",
        },
        {
          type: "numbered",
          items: [
            {
              title: "Finding the right people",
              body: "Early products rarely have a clear user portrait. Teams often search communities from product category first, and end up in subreddits that look relevant but convert poorly.",
            },
            {
              title: "Growth actions that cannot compound",
              body: "Which community, what angle, what content, and what results — these usually live in spreadsheets and personal memory. It becomes hard to review what actually worked.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "So I split the problem into two layers: first, how to find where real demand happens; then, how to turn Reddit operations into reviewable assets.",
        },
      ],
    },
    {
      id: "core-insight",
      level: 1,
      number: "3.",
      title: "Core Insight",
      blocks: [
        {
          type: "bullets",
          items: [
            "Most existing Reddit acquisition tools rely on keyword, competitor, or SEO matching: input a product and competitors, and the system finds similar communities and similar posts. That works for mature products with clear categories, competitors, and keywords.",
            "But 0→1 products face a different problem. Early products often start from a fuzzy idea, and the user portrait itself is still unstable. More importantly, real users are not always concentrated in category communities — they are scattered across situational communities where demand actually occurs.",
            "Take an AI companion product. Conventional tools recommend AI or chatbot subreddits, but conversion is weak. Real demand shows up in seemingly unrelated places — for example, gamers saying they feel empty playing alone and wish someone were there. That signal cannot be found through “product category → subreddit.” It has to be reverse-engineered through “user situation → demand expression.”",
          ],
        },
        {
          type: "paragraph",
          text: "So the design starting point of the system is:",
        },
        {
          type: "quote",
          text: "From product matching to situational reverse engineering",
        },
      ],
    },
    {
      id: "product-architecture",
      level: 1,
      number: "4.",
      title: "Product Architecture",
      blocks: [
        {
          type: "paragraph",
          text: "The product is organized into four modules:",
        },
        {
          type: "numbered",
          items: [
            {
              title: "Product Brief: turn a fuzzy idea into a researchable product context",
              body: "Users input a product description, target users, competitors, or a website. Through follow-up questions, AI helps them articulate the product clearly: what problem it solves, who it is for, in what situations it is used, and how it differs from existing alternatives. The system turns natural-language descriptions into a more concrete product context, which then grounds situational keyword derivation and Reddit search.",
            },
            {
              title: "Growth Research: reverse-engineer real demand scenes from product context",
              body: "The system derives situational keywords from the product description, searches real posts across Reddit, and ranks results by relevance, recency, demand intensity, and engagement activity. The output is a list of potential acquisition communities and opportunity posts.",
            },
            {
              title: "Action Workspace: turn opportunities into executable interaction actions",
              body: "Based on opportunity posts, it generates reply angles, post drafts, or imitable content structures to engage users.",
            },
            {
              title: "Dashboard / Audience: turn Reddit operations into reviewable assets",
              body: "It tracks account publishing performance, community performance, commenter leads, and potential user portraits, and consolidates them into reviewable growth assets.",
            },
          ],
        },
      ],
    },
  ],
};

const fourthTrimesterHealthCn: ProjectCopy = {
  title: "Fourth Trimester Health",
  description: "为产后阶段开发可穿戴与环境传感系统。",
  tags: ["AI Product", "Product Research", "Service Design"],
  sections: [
    {
      id: "overview",
      level: 1,
      number: "1.",
      title: "项目概览",
      blocks: [
        {
          type: "paragraph",
          text: "命题来自本田研究院：构建一个能生成用户「数字孪生」、并据此给出健康建议的监测生态。我们最终交付了一套双端系统：面向母亲的移动 App、面向医生的 Web Dashboard，加上穿戴设备与环境传感器，原始数据经智能模型处理后上云，再把需要关注的通知与报告分别推给母亲或医生。",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-architecture.png",
          alt: "Fourth Trimester Health 系统架构图",
          caption: "[系统架构图]",
          width: 468,
          height: 370,
        },
      ],
    },
    {
      id: "framing-the-opportunity",
      level: 1,
      number: "2.",
      title: "问题定义：从一片模糊里锁定机会",
      blocks: [
        {
          type: "paragraph",
          text: "起点是一个很宽的命题「出院后的护理」。这么大的范围里，先要做的是收敛到一个具体、且真正值得做的问题。我们最后选了产后的「第四孕期」。所谓第四孕期，指的是分娩后的头 12 周，产后抑郁、高血压、子痫、血栓、大出血等都集中在这段时间发生。产后期占孕产相关死亡的 53%，其中 80% 本可预防；约 50% 的产后抑郁从未被诊断。产检密集，产后却通常只有一次 6 周随访，这是一个高风险、却被系统性忽视的空档，也是我们关注的地方。",
        },
        {
          type: "paragraph",
          text: "我们访谈了 7 位产后母亲和 5 位医疗方（ob/gyn、doula 等），并观察线上社群做二手研究。方法上，我把访谈整理成亲和图，从中提炼洞察，再让每一条洞察对应一条设计原则。由此确立了整个产品的北极星规则：「最小化母亲的认知负荷」。母亲要为新生儿做的事已经太多，系统就必须极简：只呈现一眼可读的健康信息，其余一律收起。其它原则也顺此而来：温和鼓励的措辞、被动式的数据追踪、不制造焦虑的可视化。",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-affinity-mapping.png",
          alt: "亲和图",
          width: 936,
          height: 538,
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-affinity.png",
          alt: "亲和图与洞察到原则的映射",
          caption: "[亲和图 + 洞察→原则映射表]",
          width: 932,
          height: 734,
        },
      ],
    },
    {
      id: "three-product-decisions",
      level: 1,
      number: "3.",
      title: "三个关键产品决策",
      blocks: [
        {
          type: "numbered",
          items: [
            {
              title: "用测试代替猜测：支持性通知的语气",
              body: "我们不确定该用什么语气跟一个脆弱期的母亲说话。与其靠审美拍板，我做了一个 FigJam 矩阵测试（喜欢↔不喜欢 × 温和↔激进），把 AI 生成和团队头脑风暴的通知让母亲们自己归位。反常识的发现是：要避免「我懂你的感受」式的共情；「mama / babe」这类称呼会招致反感；通知以积极收尾明显更受欢迎；甚至「这条消息由谁发出」比内容本身更影响接受度。",
            },
            {
              title: "为真实的行为差异和伦理设计：隐私",
              body: "我用矩阵测试（数据类型 × 可见对象：本人/伴侣/家人/医生/「the void」）去测母亲们的数据共享意愿，发现偏好差异极大——有人只肯给自己和医生看，有人愿意开放给亲友和 AI。结论因此不是一个统一默认，而是可定制的隐私控制 + 默认保守。",
            },
          ],
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-privacy-matrix.png",
          alt: "隐私共享矩阵",
          caption: "[隐私共享矩阵]",
          width: 936,
          height: 746,
        },
        {
          type: "numbered",
          start: 3,
          items: [
            {
              title: "知道什么时候不该用 AI：情绪数据不进模型",
              body: "情绪是这个产品里最重要的信号之一，而访谈里最刺痛的几句话都和情绪有关。所以一个很自然的想法是：把自评情绪也喂给异常检测模型，让 AI 一起判断。我们讨论后决定不这么做。原因是自评情绪高度主观、颗粒度不稳定、且个体差异极大，把它塞进模型只会污染生理信号的判断，让本来就要求高准确度的医疗预警变得更不可信。于是我们把情绪输入重新定位成一个纯粹给母亲自己用的工具：每日签到、记录心情、写下具体困扰，以及一块自由反思的空间。",
            },
          ],
        },
      ],
    },
    {
      id: "ai-product-thinking",
      level: 1,
      number: "4.",
      title: "AI 产品思考：让健康预警系统自我进化 ★",
      blocks: [
        {
          type: "paragraph",
          text: "产后监测最特殊的地方在于：基线本身一直在动。一位母亲产后第 3 天的「正常心率」，和第 6 周的「正常」完全不是一回事；因此任何一套固定阈值都可能导致误判。所以这个系统从数据、模型到语言，每一层都必须能跟着人一起变。",
        },
      ],
    },
    {
      id: "data-trustworthy-signal",
      level: 2,
      number: "4.1",
      title: "数据：让信号可信",
      blocks: [
        {
          type: "paragraph",
          text: "真实传感器数据到位前，我们用 100Hz 生成模拟数据搭通了整条预处理流水线，并刻意按 80% 正常 / 20% 异常分布，以便验证流水线真的能保住异常特征而不是把它一起洗掉。处理链路上有几个针对生理信号特性的选择：心率和血压容易受运动伪影和高频噪声干扰，用带通滤波保留有意义的频段；体温变化缓慢，则用 Savitzky-Golay 滤波。标准化时，我们只用前 80% 的正常数据来拟合均值和标准差，这样后 20% 的异常在模型眼里才会真正「跳出来」。各传感器时钟和采样率都不同，我们再建一条合成时间轴把所有信号对齐，保证每一行代表同一时刻。",
        },
      ],
    },
    {
      id: "model-unsupervised-adaptive",
      level: 2,
      number: "4.2",
      title: "模型：无监督，自适应",
      blocks: [
        {
          type: "paragraph",
          text: "由于用户的数据有独特性，我们没有大规模标注的产后异常数据，因此模型采用多元高斯的无监督异常检测：它学习的是「这个人的正常长什么样」，用标准差（sigma）定义偏离阈值，同时输出一个全局异常分和每个生理维度的单独分数。因为它看的是所有信号的联合分布，能抓到单看一路信号时会漏掉的组合型异常，比如「心率偏高 + 活动量很低」这种单项都不越界、合起来却值得警惕的模式。",
        },
      ],
    },
    {
      id: "three-generations-detection",
      level: 2,
      number: "4.3",
      title: "检测逻辑的三次演进",
      blocks: [
        {
          type: "paragraph",
          text: "从「数值是多少」到「这段时间的状态如何」，再到「变化的形态对不对」。",
        },
        {
          type: "table",
          headers: ["阶段", "做法", "为什么不够"],
          rows: [
            [
              "Phase 1–2",
              "单点检测：每个读数独立判断是否越界",
              "完全没有时间上下文。一次瞬时抖动就报警，噪声全变成告警",
            ],
            [
              "Phase 3",
              "区间检测：取短时间窗内的均值/中位数作为输入",
              "降噪，反映的是「这一段时间身体的整体状态」，而非孤立尖峰",
            ],
            [
              "Phase 3",
              "时序变化 + LSTM Autoencoder：模型学习重建正常的时序模式，重建误差大即判为异常",
              "能捕捉「变化方式」本身的异常——比如心率的突然跃升，而不只是「数值多少」",
            ],
          ],
        },
      ],
    },
    {
      id: "from-output-to-language",
      level: 2,
      number: "4.4",
      title: "从模型输出到人话：好例子与坏例子",
      blocks: [
        {
          type: "paragraph",
          text: "模型能吐出异常和分数，但用户接收的信息需要简洁、清晰易懂。我们使用 COSTAR 框架模块化构建输出语言 prompt，并写死了几条护栏，其中最重要的一条是：不允许下诊断，但可以引用医生既往的诊断结论。",
        },
        {
          type: "paragraph",
          text: "坏例子（我们踩到的真实问题）：早期测试中我们发现，不同类型的异常，LLM 给出的严重度分数校准是不一致的，同样「中等严重」的血氧异常和体温异常，可能拿到完全不同的分数。这意味着分数在跨异常类型时不可比，而整个通知语气、是否通知护理团队、是否呼叫急救，全都挂在这个分数上。这是个会直接影响安全的缺陷。",
        },
        {
          type: "paragraph",
          text: "修复：我们把一份具体的校准范例写进 context window，以血氧为例，明确 0–5 每一级对应的数值区间（95–100% / 92–95% / 90–92% / 88–90% / 80–88% / <80%），用它给模型锚定「严重度」这个概念的尺度，再让它迁移到其它异常类型上。同时约束输出必须是 0–5 的单个整数，消除自由发挥空间。改完之后我们又跑了一轮回归测试，确认加入新 context 后 LLM 在其它异常上的输出仍然正确。",
        },
        {
          type: "paragraph",
          text: "在这套分数之上，我们定义了一个 0–5 的严重度阶梯，每一级绑定三样东西：一个递进副词、一句给母亲的动作、一个系统升级动作。",
        },
        {
          type: "code",
          label: "输入 anomaly_data.json",
          text: `{ "anomaly": "High blood pressure",
  "severity_score": 7,
  "mitigation_technique": "Monitor regularly, reduce sodium intake" }`,
        },
        {
          type: "code",
          label: "模板",
          text: "It looks like your [异常] is [严重度副词] [方向]. Try [缓解建议].",
        },
        {
          type: "table",
          headers: ["分数", "严重度", "递进副词", "给母亲的动作", "系统升级动作"],
          rows: [
            ["0", "无风险", "—", "—", "不发通知"],
            ["1", "低", "slightly", "监测 / 留意", "—"],
            ["2", "低-中", "somewhat", "轻微调整", "—"],
            ["3", "中", "moderately", "改变行为，留意其它症状", "—"],
            ["4", "高", "very", "立即行动", "通知护理团队"],
            ["5", "危急", "critically", "—", "通知照护者 + 自动呼叫急救（可取消）"],
          ],
        },
      ],
    },
    {
      id: "two-overlooked-decisions",
      level: 2,
      number: "4.5",
      title: "两个容易被忽略的产品决策",
      blocks: [
        {
          type: "numbered",
          items: [
            {
              title: "告警疲劳",
              body: "系统在把异常送进 LLM 之前，会先和上一条已发送的异常比对，只有当它确实变化了才触发新通知。医疗告警产品最常见的死法就是告警太多、用户全部静音，这层过滤是在保护通知本身的可信度。",
            },
            {
              title: "成本可行性",
              body: "我们实测过 token 消耗，每份周报约 1000 tokens，每条通知约 70 tokens。按每天 5 条通知 + 每周 2 份报告估算，加上约 1500 tokens 的输入上下文（患者信息、指令、ML 输出、历史异常），每位患者每周的 LLM 成本约 0.062 美分。做医疗 AI 产品必须回答「规模化之后成本是否可控」，这个数字说明这套设计在成本上是成立的。",
            },
          ],
        },
      ],
    },
    {
      id: "the-system",
      level: 1,
      number: "5.",
      title: "产品展示",
      blocks: [
        {
          type: "paragraph",
          text: "以下是我们最终交付的实物与界面。",
        },
      ],
    },
    {
      id: "the-wearable",
      level: 2,
      number: "5.1",
      title: "可穿戴设备",
      blocks: [
        {
          type: "paragraph",
          text: "手腕主设备集成脉搏血氧、热敏电阻与 IMU，通过震动马达、LED、屏幕与实体按键给出反馈。因为屏幕极小，我们重新绘制了一整套 32×32 像素图标以保证可读性。",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-wearable-demo.png",
          alt: "可穿戴手环示例",
          caption: "[可穿戴手环示例]",
          width: 602,
          height: 444,
        },
      ],
    },
    {
      id: "environmental-sensing",
      level: 2,
      number: "5.2",
      title: "环境感知：基站与模块化子站",
      blocks: [
        {
          type: "image",
          src: "/images/fourth-trimester-health-base-station-model.png",
          alt: "基站硬件模型",
          caption: "[硬件模型]",
          width: 936,
          height: 526,
        },
        {
          type: "paragraph",
          text: "环境侧由一个基站和若干可插拔子站组成——环境与空气质量、摄像头、用药依从性药盒。用户可以按自己的需要增减模块。设计语言来自一次与新手妈妈的对话：她描述的是不断多任务处理的疲惫。于是我们放弃了传统医疗界面那种铺满数据和警报的做法，转向「隐形的支持」：用克制的光效和物理交互传达状态，而不是又一块要求她注意的屏幕。",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-base-station-ui.gif",
          alt: "基站交互演示",
          caption: "[基站交互demo]",
          width: 512,
          height: 376,
        },
      ],
    },
    {
      id: "patient-app",
      level: 2,
      number: "5.3",
      title: "母亲端 App",
      blocks: [
        {
          type: "paragraph",
          text: "Flutter 构建，通过蓝牙直连穿戴设备。首页按「通知 / 置顶指标 / 待办」组织，母亲自己决定看什么；My Health 可在穿戴与环境数据间切换，逐层下钻到单项指标的日/周/月趋势。整体沿用 Apple Health 式的模块化卡片，配合 AI 摘要帮助解读数据，并用颜色区分「正常 / 好转 / 需关注」。",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-patient-app-demo.mp4",
          alt: "用户端 APP demo",
          caption: "[用户端APP demo]",
          width: 400,
          height: 889,
          layout: "phone",
        },
      ],
    },
    {
      id: "provider-dashboard",
      level: 2,
      number: "5.4",
      title: "医生端 Dashboard",
      blocks: [
        {
          type: "paragraph",
          text: "React 前端，提供患者检索（姓名/生日/位置）、历史异常报告与缓解建议、告警查看和医生记录。设计上刻意贴近医生已经熟悉的 EMR 系统（参考 EPIC），降低学习成本。",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-provider-dashboard-demo.gif",
          alt: "医生端 Dashboard 演示",
          caption: "[医生端 Dashboard demo]",
          width: 720,
          height: 405,
        },
      ],
    },
    {
      id: "system-and-cloud",
      level: 2,
      number: "5.5",
      title: "系统与云",
      blocks: [
        {
          type: "paragraph",
          text: "穿戴与环境硬件 → 边缘基站（本地跑模型，支持快速重训与实时检测）→ AWS（EC2 + NGINX、DynamoDB、S3、Lambda）→ App 与医生端；紧急告警经 Lambda 监测后通过 Twilio 发送短信。异常历史存于云端，作为 LLM 生成上下文感知报告的依据。",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-system-architecture.png",
          alt: "系统架构图",
          caption: "[系统架构]",
          width: 512,
          height: 269,
        },
      ],
    },
    {
      id: "outcome-and-feedback",
      level: 1,
      number: "6.",
      title: "成果与反馈",
      blocks: [
        {
          type: "numbered",
          items: [
            {
              title: "来自医生的反馈",
              body: "一位妇产科医生表示，她会让患者填写一份经过研究验证的量表，作为两次就诊之间了解患者状态的方式，而我们的系统用连续、客观的数据使这个过程更科学。",
            },
            {
              title: "来自母亲的反馈",
              body: "「生完孩子之后，我就被丢在那儿了，一个人。」「产后抑郁的根源是一种孤立感、一种失去自主权的感觉。它是你人生的一次剧变。」「这个系统会帮到我」「我希望有这个系统」",
            },
            {
              title: "来自本田的反馈",
              body: "Demo 之后，本田方面指出我们方案中的相当一部分同样适用于老年照护场景。这对我们是一个重要信号：围绕「离院后的连续监测 + 把机器输出翻译成人能行动的语言」所建立的这套架构，具备迁移到其它照护人群的潜力。",
            },
          ],
        },
      ],
    },
  ],
};

const fourthTrimesterHealthEn: ProjectCopy = {
  title: "Fourth Trimester Health",
  description:
    "Developing a wearable and environmental sensor system for the postpartum period.",
  tags: ["AI Product", "Product Research", "Service Design"],
  sections: [
    {
      id: "overview",
      level: 1,
      number: "1.",
      title: "Overview",
      blocks: [
        {
          type: "paragraph",
          text: "The brief came from Honda Research Institute: build a monitoring ecosystem that can generate a user's \"digital twin\" and, from it, offer health guidance. We ultimately delivered a dual-ended system — a mobile app for mothers and a web dashboard for clinicians — together with wearables and environmental sensors. Raw data is processed by intelligent models, sent to the cloud, and then routed as alerts and reports to either the mother or the clinician when attention is needed.",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-architecture.png",
          alt: "Fourth Trimester Health system architecture diagram",
          caption: "[System architecture diagram]",
          width: 468,
          height: 370,
        },
      ],
    },
    {
      id: "framing-the-opportunity",
      level: 1,
      number: "2.",
      title: "Framing the Opportunity",
      blocks: [
        {
          type: "paragraph",
          text: "We started from a broad prompt: \"care after discharge.\" Inside that wide space, the first job was to converge on a problem that was both concrete and worth solving. We landed on the postpartum \"fourth trimester\" — the first 12 weeks after birth, when postpartum depression, hypertension, eclampsia, thrombosis, hemorrhage, and related risks concentrate. The postpartum period accounts for 53% of pregnancy-related deaths, of which 80% are preventable; about 50% of postpartum depression is never diagnosed. Prenatal care is dense, yet postpartum follow-up is often a single visit at six weeks — a high-risk gap that is systematically overlooked, and the place we chose to focus.",
        },
        {
          type: "paragraph",
          text: "We interviewed 7 postpartum mothers and 5 clinical stakeholders (ob/gyn, doula, and others), and observed online communities as secondary research. Methodologically, I organized interviews into affinity maps, extracted insights, and mapped each insight to a design principle. That process established the product's north-star rule: minimize cognitive load for the mother. Mothers already have too much to do for a newborn, so the system has to stay radical in its simplicity — surface only glanceable health information, and tuck everything else away. The remaining principles followed from that: gently encouraging language, passive data tracking, and visualizations that do not manufacture anxiety.",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-affinity-mapping.png",
          alt: "Affinity diagram",
          width: 936,
          height: 538,
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-affinity.png",
          alt: "Affinity diagram and insight-to-principle map",
          caption: "[Affinity diagram + insight-to-principle map]",
          width: 932,
          height: 734,
        },
      ],
    },
    {
      id: "three-product-decisions",
      level: 1,
      number: "3.",
      title: "Three Product Decisions",
      blocks: [
        {
          type: "numbered",
          items: [
            {
              title: "Test, don't guess: notification tone",
              body: "We were unsure what tone to use when speaking to a mother in a vulnerable period. Instead of deciding by taste, I ran a FigJam matrix test (like ↔ dislike × gentle ↔ assertive) and asked mothers to place notifications generated by AI and brainstormed by the team. The counterintuitive findings: avoid \"I understand how you feel\" empathy; terms like \"mama / babe\" provoke resistance; notifications that end on a positive note are clearly preferred; and even who the message appears to come from can matter more than the content itself.",
            },
            {
              title: "Design for variance and ethics: privacy",
              body: "I used a matrix test (data type × audience: self / partner / family / clinician / \"the void\") to probe mothers' willingness to share data, and found preferences varied enormously — some would only share with themselves and clinicians, others were open to loved ones and AI. So the conclusion was not a single default, but customizable privacy controls with a conservative default.",
            },
          ],
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-privacy-matrix.png",
          alt: "Privacy sharing matrix",
          caption: "[Privacy matrix]",
          width: 936,
          height: 746,
        },
        {
          type: "numbered",
          start: 3,
          items: [
            {
              title: "Knowing when not to use AI: keeping emotional data out of the model",
              body: "Emotion is one of the most important signals in this product, and some of the most piercing interview lines were about emotion. A natural idea followed: feed self-reported emotion into the anomaly-detection model and let AI judge alongside physiology. After discussion, we decided not to. Self-reported emotion is highly subjective, unstable in granularity, and wildly individual; stuffing it into the model would only pollute physiological judgment and make already high-stakes medical alerts less trustworthy. So we repositioned emotional input as a tool purely for the mother herself: daily check-ins, logging mood, writing down specific worries, and a free space for reflection.",
            },
          ],
        },
      ],
    },
    {
      id: "ai-product-thinking",
      level: 1,
      number: "4.",
      title: "AI Product Thinking: Making an Alerting System That Evolves With the Body ★",
      blocks: [
        {
          type: "paragraph",
          text: "What makes postpartum monitoring unusual is that the baseline itself keeps moving. A mother's \"normal heart rate\" on day 3 after birth is not the same \"normal\" at week 6; any fixed threshold can therefore misjudge. So from data to model to language, every layer of this system has to change with the person.",
        },
      ],
    },
    {
      id: "data-trustworthy-signal",
      level: 2,
      number: "4.1",
      title: "Data: making the signal trustworthy first",
      blocks: [
        {
          type: "paragraph",
          text: "Before real sensor data arrived, we generated 100Hz synthetic data to stand up the full preprocessing pipeline, deliberately distributed as 80% normal / 20% anomalous so we could verify the pipeline preserved anomaly features instead of washing them out. Several choices targeted physiological signal properties: heart rate and blood pressure are prone to motion artifact and high-frequency noise, so we used bandpass filtering to keep the meaningful bands; body temperature changes slowly, so we used Savitzky-Golay filtering. For standardization, we fit mean and standard deviation on only the first 80% of normal data, so the remaining 20% of anomalies would truly \"pop\" to the model. Sensor clocks and sampling rates also differed, so we built a synthetic timeline to align every signal — each row representing the same moment.",
        },
      ],
    },
    {
      id: "model-unsupervised-adaptive",
      level: 2,
      number: "4.2",
      title: "The model: unsupervised, and patient-adaptive",
      blocks: [
        {
          type: "paragraph",
          text: "Because each user's data is distinctive and we lacked large-scale labeled postpartum anomalies, the model uses multivariate Gaussian unsupervised anomaly detection: it learns what \"normal\" looks like for this person, defines deviation thresholds with standard deviation (sigma), and outputs both a global anomaly score and a per-dimension physiological score. Because it sees the joint distribution of all signals, it can catch combinatorial anomalies that single-channel thresholds miss — for example \"elevated heart rate + very low activity,\" where neither signal alone crosses a line, but together they warrant attention.",
        },
      ],
    },
    {
      id: "three-generations-detection",
      level: 2,
      number: "4.3",
      title: "Three generations of detection logic",
      blocks: [
        {
          type: "paragraph",
          text: "From \"what is the number\" to \"what is the state over this window\" to \"is the shape of the change itself right.\"",
        },
        {
          type: "table",
          headers: ["Phase", "Approach", "Why it wasn't enough"],
          rows: [
            [
              "Phase 1–2",
              "Point detection: each reading judged independently against a threshold",
              "No temporal context at all. One instantaneous jitter becomes an alert; noise turns into alarms",
            ],
            [
              "Phase 3",
              "Window detection: mean/median over a short time window as input",
              "Reduces noise; reflects the body's overall state over a stretch of time, not an isolated spike",
            ],
            [
              "Phase 3",
              "Temporal change + LSTM Autoencoder: the model learns to reconstruct normal temporal patterns; large reconstruction error means anomaly",
              "Captures anomalies in the way change happens — a sudden jump in heart rate, not only \"how high the number is\"",
            ],
          ],
        },
      ],
    },
    {
      id: "from-output-to-language",
      level: 2,
      number: "4.4",
      title: "From output to language: good cases and bad",
      blocks: [
        {
          type: "paragraph",
          text: "The model can emit anomalies and scores, but what users receive has to be concise and easy to understand. We used the COSTAR framework to modularize the language prompt, and hard-coded several guardrails — the most important: never make a diagnosis, though citing a clinician's prior diagnosis is allowed.",
        },
        {
          type: "paragraph",
          text: "Bad case (a real problem we hit): in early testing we found severity scores from the LLM were inconsistently calibrated across anomaly types. The same \"medium severity\" oxygen anomaly and temperature anomaly could receive completely different scores. That meant scores were not comparable across anomaly types — yet notification tone, whether to notify the care team, and whether to call emergency services all hung on that score. This was a safety-critical defect.",
        },
        {
          type: "paragraph",
          text: "Fix: we put a concrete calibration exemplar into the context window. Using blood oxygen as the anchor, we defined the numeric ranges for each level 0–5 (95–100% / 92–95% / 90–92% / 88–90% / 80–88% / <80%), giving the model a scale for \"severity,\" then asked it to transfer that scale to other anomaly types. We also constrained output to a single integer from 0–5, removing free-form improvisation. After the change we ran another regression pass to confirm the new context still produced correct outputs on other anomalies.",
        },
        {
          type: "paragraph",
          text: "On top of that score we defined a 0–5 severity ladder. Each level binds three things: a progressive adverb, an action for the mother, and a system escalation action.",
        },
        {
          type: "code",
          label: "Input anomaly_data.json",
          text: `{ "anomaly": "High blood pressure",
  "severity_score": 7,
  "mitigation_technique": "Monitor regularly, reduce sodium intake" }`,
        },
        {
          type: "code",
          label: "Template",
          text: "It looks like your [anomaly] is [severity adverb] [direction]. Try [mitigation].",
        },
        {
          type: "table",
          headers: ["Score", "Severity", "Adverb", "Action for mother", "System escalation"],
          rows: [
            ["0", "No risk", "—", "—", "Do not send a notification"],
            ["1", "Low", "slightly", "Monitor / pay attention", "—"],
            ["2", "Low–medium", "somewhat", "Minor adjustment", "—"],
            ["3", "Medium", "moderately", "Change behavior; watch for other symptoms", "—"],
            ["4", "High", "very", "Act immediately", "Notify care team"],
            ["5", "Critical", "critically", "—", "Notify caregivers + auto-call emergency (cancellable)"],
          ],
        },
      ],
    },
    {
      id: "two-overlooked-decisions",
      level: 2,
      number: "4.5",
      title: "Two easily-overlooked product decisions",
      blocks: [
        {
          type: "numbered",
          items: [
            {
              title: "Alert fatigue",
              body: "Before sending an anomaly into the LLM, the system compares it with the last sent anomaly and only triggers a new notification when it has truly changed. The most common failure mode of medical alert products is too many alerts until users mute everything — this filter protects the credibility of the notification itself.",
            },
            {
              title: "Cost viability",
              body: "We measured token use: ~1000 tokens per weekly report, ~70 tokens per notification. Estimating 5 notifications/day + 2 reports/week, plus ~1500 tokens of input context (patient info, instructions, ML output, historical anomalies), LLM cost per patient per week is about 0.062 cents. A medical AI product has to answer whether cost stays controllable at scale — this number says the design holds.",
            },
          ],
        },
      ],
    },
    {
      id: "the-system",
      level: 1,
      number: "5.",
      title: "The System",
      blocks: [
        {
          type: "paragraph",
          text: "Here is the hardware and interface we ultimately delivered.",
        },
      ],
    },
    {
      id: "the-wearable",
      level: 2,
      number: "5.1",
      title: "The Wearable",
      blocks: [
        {
          type: "paragraph",
          text: "The wrist-worn main device integrates pulse oximetry, a thermistor, and an IMU, and gives feedback through a vibration motor, LEDs, a screen, and physical buttons. Because the screen is tiny, we redrew a full set of 32×32 pixel icons to keep them readable.",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-wearable-demo.png",
          alt: "The Wearable demo",
          caption: "[The Wearable demo]",
          width: 602,
          height: 444,
        },
      ],
    },
    {
      id: "environmental-sensing",
      level: 2,
      number: "5.2",
      title: "Environmental Sensing: Base Station + Modular Substations",
      blocks: [
        {
          type: "image",
          src: "/images/fourth-trimester-health-base-station-model.png",
          alt: "Base Station hardware model",
          caption: "[Base Station Model]",
          width: 936,
          height: 526,
        },
        {
          type: "paragraph",
          text: "On the environmental side, a base station plus several pluggable substations cover environment and air quality, a camera, and a medication-adherence pillbox. Users can add or remove modules as needed. The design language came from a conversation with a new mother describing the exhaustion of constant multitasking. So we abandoned the traditional medical UI that floods the screen with data and alerts, and moved toward invisible support — restrained light and physical interaction to convey state, instead of yet another screen demanding her attention.",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-base-station-ui.gif",
          alt: "Base Station interaction demo",
          caption: "[Base Station Interaction Demo]",
          width: 512,
          height: 376,
        },
      ],
    },
    {
      id: "patient-app",
      level: 2,
      number: "5.3",
      title: "Patient App",
      blocks: [
        {
          type: "paragraph",
          text: "Built in Flutter and connected to the wearable over Bluetooth. The home screen is organized as Notifications / Pinned metrics / To-dos, so the mother decides what to look at. My Health switches between wearable and environmental data and drills down into day/week/month trends for each metric. The overall pattern follows Apple Health–style modular cards, with AI summaries to help interpret the data and color to distinguish normal / improving / needs attention.",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-patient-app-demo.mp4",
          alt: "Patient APP demo",
          caption: "[Patient APP demo]",
          width: 400,
          height: 889,
          layout: "phone",
        },
      ],
    },
    {
      id: "provider-dashboard",
      level: 2,
      number: "5.4",
      title: "Provider Dashboard",
      blocks: [
        {
          type: "paragraph",
          text: "A React frontend with patient search (name / birth date / location), historical anomaly reports and mitigation suggestions, alert review, and clinician notes. We deliberately stayed close to EMR systems clinicians already know (referencing EPIC) to keep the learning curve low.",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-provider-dashboard-demo.gif",
          alt: "Provider Dashboard demo",
          caption: "[Provider Dashboard demo]",
          width: 720,
          height: 405,
        },
      ],
    },
    {
      id: "system-and-cloud",
      level: 2,
      number: "5.5",
      title: "System & Cloud",
      blocks: [
        {
          type: "paragraph",
          text: "Wearable and environmental hardware → edge base station (models run locally, supporting fast retraining and real-time detection) → AWS (EC2 + NGINX, DynamoDB, S3, Lambda) → the app and provider dashboard. Urgent alerts are watched by Lambda and sent as SMS via Twilio. Anomaly history lives in the cloud and becomes the basis for LLM-generated, context-aware reports.",
        },
        {
          type: "image",
          src: "/images/fourth-trimester-health-system-architecture.png",
          alt: "System architecture diagram",
          caption: "[System Architecture]",
          width: 512,
          height: 269,
        },
      ],
    },
    {
      id: "outcome-and-feedback",
      level: 1,
      number: "6.",
      title: "Outcome & Feedback",
      blocks: [
        {
          type: "numbered",
          items: [
            {
              title: "From clinicians",
              body: "An ob/gyn said she would have patients fill out a research-validated questionnaire between visits as a way to understand their state — and that our system makes that process more scientific with continuous, objective data.",
            },
            {
              title: "From mothers",
              body: "\"After I gave birth, I was just left there, alone.\" \"The root of postpartum depression is a sense of isolation, a sense of losing autonomy. It is a seismic shift in your life.\" \"This system would help me.\" \"I wish I had this system.\"",
            },
            {
              title: "From Honda",
              body: "After the demo, Honda noted that a substantial part of our approach could also apply to eldercare. That was an important signal for us: the architecture built around continuous post-discharge monitoring plus translating machine output into language people can act on has potential to transfer to other care populations.",
            },
          ],
        },
      ],
    },
  ],
};

function blankCopy(
  titleEn: string,
  descEn: string,
  titleCn: string,
  descCn: string,
): { en: ProjectCopy; cn: ProjectCopy } {
  const blankSection = (
    id: string,
    number: string,
    titleEnLocal: string,
    titleCnLocal: string,
  ): { en: ProjectSection; cn: ProjectSection } => ({
    en: {
      id,
      level: 1,
      number,
      title: titleEnLocal,
      blocks: [
        {
          type: "paragraph",
          text: "This section is intentionally blank for now. Project content will be added here.",
        },
      ],
    },
    cn: {
      id,
      level: 1,
      number,
      title: titleCnLocal,
      blocks: [
        {
          type: "paragraph",
          text: "此部分暂时为空，项目内容稍后会添加在这里。",
        },
      ],
    },
  });

  const overview = blankSection("overview", "1.", "Overview", "概览");
  const process = blankSection("process", "2.", "Process", "过程");
  const outcome = blankSection("outcome", "3.", "Outcome", "成果");

  return {
    en: {
      title: titleEn,
      description: descEn,
      sections: [overview.en, process.en, outcome.en],
    },
    cn: {
      title: titleCn,
      description: descCn,
      sections: [overview.cn, process.cn, outcome.cn],
    },
  };
}

export const projects: Project[] = [
  {
    slug: "reddit-growth-os",
    image: "/images/reddit-growth-os-cover.png",
    imageAlt: "Reddit Growth OS cover — Snoo with research markup",
    en: redditGrowthOsEn,
    cn: redditGrowthOsCn,
  },
  {
    slug: "fourth-trimester-health",
    image: "/images/fourth-trimester-health-cover.png",
    imageAlt:
      "Fourth Trimester Health cover — purple postpartum research poster with CMU branding",
    showInHomeGrid: false,
    en: fourthTrimesterHealthEn,
    cn: fourthTrimesterHealthCn,
  },
  {
    slug: "vr-chord",
    image: "/images/vr-chord-cover.png",
    imageAlt: "VR Chord — reimagining typing in virtual reality",
    showInHomeGrid: false,
    en: {
      title: "VR Chord",
      description: "Reimagining typing in virtual reality",
      tags: ["XR / VR", "Interaction Design", "Rapid Prototyping"],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "VR Chord is an interaction prototype exploring how to type better in virtual reality. Existing VR input has three common pain points — tiring (hands floating to tap, shoulders and arms fatigue quickly), slow (controller pointing is inefficient), and difficult (keyboards float in space and are hard to locate quickly). This project tries several approaches to answer the question: how should VR input methods be designed?",
            },
            {
              type: "image",
              src: "/images/vr-chord-problem-definition.png",
              alt: "VR Chord problem definition — problem, pain points, and potential solutions",
              width: 1024,
              height: 494,
            },
          ],
        },
        {
          id: "three-approaches",
          level: 1,
          number: "2.",
          title: "Three Approaches",
          blocks: [],
        },
        {
          id: "split-keyboard",
          level: 2,
          number: "2.1",
          title: "Split Keyboard",
          blocks: [
            {
              type: "paragraph",
              text: 'Inspired by CHI 2019 "Typing on Split Keyboards with Peripheral Vision" (Lu et al.) and peripheral typing: once the keyboard is split in two, visual focus can stay on the output text while the keyboard recedes into peripheral vision — eliminating the attention switching of scanning back and forth between the two halves. On touchscreen, the original paper found this mode about 28% faster than "staring at the keyboard" (reaching 27 WPM). In VR, the split layout also narrows the angular offset between the hands and the center of the headset\'s field of view, and reduces arm abduction — directly targeting VR typing\'s main source of fatigue: static load from elevated arms.',
            },
            {
              type: "image",
              src: "/images/vr-chord-split-keyboard.png",
              alt: "Split keyboard peripheral typing — eyes-on, peripheral, and no-keyboard conditions",
              caption:
                "[Lu et al., Typing on Split Keyboards with Peripheral Vision, CHI 2019. DOI: 10.1145/3290605.3300472]",
              width: 1024,
              height: 911,
            },
            {
              type: "image",
              src: "/images/vr-chord-split-keyboard-demo.gif",
              alt: "Split Keyboard VR demo",
              width: 720,
              height: 468,
            },
          ],
        },
        {
          id: "piano-keyboard",
          level: 2,
          number: "2.2",
          title: "Piano Keyboard",
          blocks: [
            {
              type: "paragraph",
              text: "Inspired by Feit & Oulasvirta's PianoText (DIS 2014): the study argues that piano performance achieves extremely high keypress rates thanks to high parallelism from alternating hands and chords. Accordingly, letter-to-key mapping is treated as an optimization problem — key positions are rearranged based on letter bigram statistics in the corpus, so high-frequency letter sequences fall in positions that hands or multiple fingers can flow through or press simultaneously.",
            },
            {
              type: "numbered",
              items: [
                {
                  title: "Frequency-optimized layout",
                  body: "The 55 keys are rearranged by English letter frequency. High-frequency letters (e.g. E, about 12.7% of English text) sit in the most reachable center; low-frequency letters (e.g. Z, X) are pushed to the edges, reducing average finger travel cost — approximating targeting cost under Fitts's law.",
                },
              ],
            },
            {
              type: "mediaRow",
              items: [
                {
                  src: "/images/vr-chord-letter-frequency.png",
                  alt: "Letter frequencies in the English language",
                  width: 500,
                  height: 400,
                },
                {
                  src: "/images/vr-chord-piano-layout.png",
                  alt: "Piano keyboard layout with frequency-optimized letter mapping",
                  width: 1024,
                  height: 467,
                },
              ],
              caption: "[Letter frequency and keyboard layout mapping. Source: Wikipedia]",
            },
            {
              type: "numbered",
              start: 2,
              items: [
                {
                  title: "Chorded input",
                  body: 'For the most frequent letter clusters in English, multiple fingers press at once — two fingers for the bigram th, three for the trigram ing. This turns "letter-by-letter tapping" into chunk input: fewer actions encode more characters, like playing chords rather than individual notes.',
                },
              ],
            },
            {
              type: "image",
              src: "/images/vr-chord-piano-demo.gif",
              alt: "Piano Keyboard VR demo",
              width: 720,
              height: 468,
            },
          ],
        },
        {
          id: "drum-keyboard",
          level: 2,
          number: "2.3",
          title: "Drum Keyboard",
          blocks: [
            {
              type: "paragraph",
              text: 'Inspired by "Text Input in VR: A Preliminary Evaluation of the Drum-Like VR Keyboard" (Technologies, 2019) and its drum-kit metaphor: controllers become drumsticks, striking keys in space with downward hits — leveraging proprioception and spatial memory to reduce the burden of locating "where is the keyboard" (the original paper reports ~24.61 WPM and 7.2% error rate). On top of this, a real-time language model assists with N-Gram prediction of the next word and Levenshtein edit distance for spelling correction; candidate words appear as bubbles above the keyboard for tap-to-select — suited to lightweight input like social chat.',
            },
            {
              type: "image",
              src: "/images/vr-chord-drum-ngram.png",
              alt: "Diagram of Levenshtein distance and N-Gram word segmentation",
              caption:
                "[Diagram of Levenshtein distance and N-Gram word segmentation]",
              width: 1024,
              height: 438,
            },
            {
              type: "image",
              src: "/images/vr-chord-drum-demo.gif",
              alt: "Drum Keyboard VR demo",
              width: 720,
              height: 468,
            },
          ],
        },
        {
          id: "full-demo",
          level: 1,
          number: "3.",
          title: "Full Demo",
          blocks: [
            {
              type: "paragraph",
              text: "Build: Built on Unity + OpenXR, running on Meta Quest. The piano-style mode relies on hand tracking for multi-finger chord strikes; the drum-style mode uses controllers as drumsticks. Prediction and correction use N-Gram + Levenshtein algorithms.",
            },
            {
              type: "image",
              src: "/images/vr-chord-full-demo.mp4",
              alt: "VR Chord full demo",
              width: 720,
              height: 468,
              controls: true,
              loop: false,
            },
          ],
        },
        {
          id: "references",
          level: 1,
          number: "4.",
          title: "References",
          blocks: [
            {
              type: "bullets",
              items: [
                "Feit & Oulasvirta, PianoText: Redesigning the Piano Keyboard for Text Entry, DIS 2014. DOI: 10.1145/2598510.2598540",
                "Lu et al., Typing on Split Keyboards with Peripheral Vision, CHI 2019. DOI: 10.1145/3290605.3300472",
                "Text Input in Virtual Reality: A Preliminary Evaluation of the Drum-Like VR Keyboard, Technologies 2019, 7(2), 31. https://doi.org/10.3390/technologies7020031",
              ],
            },
          ],
        },
      ],
    },
    cn: {
      title: "VR Chord",
      description: "重新设计 VR 里的打字方式",
      tags: ["XR / VR", "交互设计", "快速原型"],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "概述",
          blocks: [
            {
              type: "paragraph",
              text: "VR Chord 是一个探索「在虚拟现实里怎么打字更好」的交互原型。现有 VR 输入普遍有三个痛点——累（手悬空敲击，肩臂很快酸痛）、慢（手柄指点效率低）、难（键盘漂浮在空中，难以快速定位）。这个项目尝试了几套方案，去回答「VR 输入法到底该被怎么设计」这个问题。",
            },
            {
              type: "image",
              src: "/images/vr-chord-problem-definition.png",
              alt: "VR Chord 问题定义——问题、痛点与潜在方案",
              width: 1024,
              height: 494,
            },
          ],
        },
        {
          id: "three-approaches",
          level: 1,
          number: "2.",
          title: "三种方案",
          blocks: [],
        },
        {
          id: "split-keyboard",
          level: 2,
          number: "2.1",
          title: "Split Keyboard（分体式）",
          blocks: [
            {
              type: "paragraph",
              text: "借鉴 CHI 2019《Typing on Split Keyboards with Peripheral Vision》（Lu et al.）提出的外周视觉打字（peripheral typing）：键盘一分为二后，视觉焦点可以留在输出文本上，让键盘退居外周视野，从而消除在键盘两半间来回扫视的注意力切换（attention switching）。原论文在触屏上验证该模式比「盯着键盘打」快约 28%（达 27 WPM）。迁移到 VR 后，分体布局同时缩小了双手与头显视野中心的角度差、压缩了手臂外展幅度——直接针对 VR 打字最主要的疲劳来源：悬空手臂的静态负荷。",
            },
            {
              type: "image",
              src: "/images/vr-chord-split-keyboard.png",
              alt: "分体式键盘外周视觉打字——直视、外周与无键盘三种条件",
              caption:
                "[Lu et al., Typing on Split Keyboards with Peripheral Vision, CHI 2019. DOI: 10.1145/3290605.3300472]",
              width: 1024,
              height: 911,
            },
            {
              type: "image",
              src: "/images/vr-chord-split-keyboard-demo.gif",
              alt: "分体式键盘 VR 演示",
              width: 720,
              height: 468,
            },
          ],
        },
        {
          id: "piano-keyboard",
          level: 2,
          number: "2.2",
          title: "Piano Keyboard（钢琴式）",
          blocks: [
            {
              type: "paragraph",
              text: "借鉴 Feit & Oulasvirta 的 PianoText（DIS 2014）：该研究指出，钢琴演奏之所以能达到极高的按键速率，源于双手交替与和弦带来的高并行度。据此把「字母到琴键的映射」当作一个优化问题，依据语料中的字母共现（二元组）统计重排键位，让高频字母序列尽量落在能被双手/多指流畅衔接或同时按下的位置。",
            },
            {
              type: "numbered",
              items: [
                {
                  title: "频率优化布局（frequency-optimized layout）",
                  body: "55 键的字母位置按英文字母出现频率重排，高频字母（如 E，约占英文文本 12.7%）置于最易触达的中心区，低频字母（如 Z、X）推向边缘，以降低平均手指移动成本（近似费茨（Fitts）定律下的触达代价）。",
                },
              ],
            },
            {
              type: "mediaRow",
              items: [
                {
                  src: "/images/vr-chord-letter-frequency.png",
                  alt: "英文字母频率分布",
                  width: 500,
                  height: 400,
                },
                {
                  src: "/images/vr-chord-piano-layout.png",
                  alt: "钢琴式键盘频率优化字母映射",
                  width: 1024,
                  height: 467,
                },
              ],
              caption: "[字母频率与键盘排布映射 来源维基百科]",
            },
            {
              type: "numbered",
              start: 2,
              items: [
                {
                  title: "和弦/组合键输入（chorded input）",
                  body: "对英文中最高频的字母簇，用多指一次性按下成词——双指同时按输入最常见的二元组 th，三指同时按输入高频三元组 ing。这把「逐字母敲击」变成「按块输入」，用更少的动作数编码更多字符，如同弹奏和弦而非逐个音符。",
                },
              ],
            },
            {
              type: "image",
              src: "/images/vr-chord-piano-demo.gif",
              alt: "钢琴式键盘 VR 演示",
              width: 720,
              height: 468,
            },
          ],
        },
        {
          id: "drum-keyboard",
          level: 2,
          number: "2.3",
          title: "Drum Keyboard（鼓式）",
          blocks: [
            {
              type: "paragraph",
              text: "借鉴《Text Input in VR: A Preliminary Evaluation of the Drum-Like VR Keyboard》（Technologies, 2019）的鼓组隐喻：手柄化作鼓槌，以向下敲击「击打」空间中的键位，借助人对空间位置本体感觉与空间记忆（proprioception / spatial memory）降低「键盘在哪」的定位负担（原论文报告约 24.61 WPM、7.2% 错误率）。在此之上叠加一层实时语言模型辅助——N-Gram 模型预测下一个词、Levenshtein 编辑距离做拼写纠错，候选词以气泡浮现于键盘上方即点即选，适合社交聊天等轻量输入。",
            },
            {
              type: "image",
              src: "/images/vr-chord-drum-ngram.png",
              alt: "Levenshtein 距离与 N-Gram 词分割示意图",
              caption: "[Levenshtein距离和N-Gram词分割的示意图]",
              width: 1024,
              height: 438,
            },
            {
              type: "image",
              src: "/images/vr-chord-drum-demo.gif",
              alt: "鼓式键盘 VR 演示",
              width: 720,
              height: 468,
            },
          ],
        },
        {
          id: "full-demo",
          level: 1,
          number: "3.",
          title: "完整展示",
          blocks: [
            {
              type: "paragraph",
              text: "构成：基于 Unity + OpenXR，运行于 Meta Quest。钢琴式依赖手部追踪实现多指和弦敲击，鼓式以手柄作为鼓槌；预测与纠错基于 N-Gram + Levenshtein 算法。",
            },
            {
              type: "image",
              src: "/images/vr-chord-full-demo.mp4",
              alt: "VR Chord 完整展示",
              width: 720,
              height: 468,
              controls: true,
              loop: false,
            },
          ],
        },
        {
          id: "references",
          level: 1,
          number: "4.",
          title: "参考文献",
          blocks: [
            {
              type: "bullets",
              items: [
                "Feit & Oulasvirta, PianoText: Redesigning the Piano Keyboard for Text Entry, DIS 2014. DOI: 10.1145/2598510.2598540",
                "Lu et al., Typing on Split Keyboards with Peripheral Vision, CHI 2019. DOI: 10.1145/3290605.3300472",
                "Text Input in Virtual Reality: A Preliminary Evaluation of the Drum-Like VR Keyboard, Technologies 2019, 7(2), 31. https://doi.org/10.3390/technologies7020031",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "pass-that-there",
    image: "/images/pass-that-there-cover.png",
    imageAlt:
      "Pass That There — collaborative XR interaction techniques for handing objects between users",
    showInHomeGrid: false,
    en: {
      title: "Pass That There",
      description:
        "Designing intuitive, low-fatigue interaction techniques for collaborative XR",
      tags: ["XR", "HCI Research", "Interaction Technique Design"],
      advisor:
        "Prof. Brad Myers (Director, CMU HCII · SIGCHI Lifetime Achievement Award)",
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: 'This project asks how collaborative interaction in XR should work. Focusing on multi-user tasks in shared virtual space, we proposed and prototyped two original interaction techniques — gesture and speech — and evaluated them through a user study on intuitiveness, efficiency, and fatigue.',
            },
          ],
        },
        {
          id: "background",
          level: 1,
          number: "2.",
          title: "Background",
          blocks: [
            {
              type: "paragraph",
              text: "Collaboration is becoming a core XR scenario. From team workspaces (such as multiplayer modeling in Arkio) to multiplayer games (such as Cards & Tankards), XR is increasingly used for people sharing one virtual space and operating together. Yet the interaction techniques that support this collaboration still largely carry over from single-user designs.",
            },
            {
              type: "paragraph",
              text: "Existing techniques and their limits. Object interaction in XR today mainly falls into two camps: natural gestures such as pinch & drag, and laser-pointer selection with controllers. Both work reasonably for solo use, but for collaborative actions like handing an object to a partner, they feel unnatural and quickly induce fatigue.",
            },
            {
              type: "paragraph",
              text: "Core pain point: gorilla arm. Holding the arms out to point and reach for long periods quickly tires the shoulders and arms — a well-known fatigue source in XR. Sustained mid-air operation is exactly the most frequent motion in collaborative scenarios.",
            },
            {
              type: "image",
              src: "/images/pass-that-there-gorilla-arm.png",
              alt: "Arm posture changes in VR — bent vs stretched arm",
              caption:
                "[Lou et al., Arm Posture Changes in VR, Applied Sciences 2022. DOI: 10.3390/app12052585]",
              width: 885,
              height: 431,
            },
            {
              type: "paragraph",
              text: "Research question: For collaborative tasks in XR, which interaction techniques feel natural and intuitive while also minimizing fatigue?",
            },
          ],
        },
        {
          id: "approach",
          level: 1,
          number: "3.",
          title: "Approach & Lineage",
          blocks: [
            {
              type: "paragraph",
              text: "Our stance: rather than further optimizing a single mid-air gesture, introduce multimodal interaction (speech + micro-gestures), assigning different responsibilities to different modalities and reducing continuous mid-air load.",
            },
            {
              type: "paragraph",
              text: 'This idea traces directly to a foundational multimodal system: MIT\'s "Put That There" (Bolt, 1980). The insight of that speak-and-point system was to let speech carry intent and pointing resolve reference (saying "put that there," with "that/there" grounded by pointing coordinates). The two modalities complement each other — reducing ambiguity while feeling more natural than either alone.',
            },
            {
              type: "paragraph",
              text: 'We migrate that classic paradigm into today\'s collaborative XR: speech expresses "I want to share," while gesture/selection determines what to share and with whom — bringing collaborative actions closer to how people communicate in the real world.',
            },
          ],
        },
        {
          id: "technique",
          level: 1,
          number: "4.",
          title: "The Invented Technique",
          blocks: [
            {
              type: "paragraph",
              text: "We narrowed broad \"collaboration\" to one concrete, high-frequency action: passing an object from one person to another in VR (scenario: Alex and Joe assembling a VR LEGO model together). Around it we designed two techniques that share one principle — a lightweight UI confirmation step that prevents accidental triggers and separates expressing intent from actually executing:",
            },
            {
              type: "numbered",
              items: [
                {
                  title: "Gesture pass (Gesture → UI)",
                  body: 'After selecting an object, the user raises an open palm toward a collaborator — a simple action with clear intent. The system recognizes a "share" intention and shows a confirmation UI; interacting with the UI completes the pass, and the object appears in the partner\'s hand.',
                },
              ],
            },
            {
              type: "image",
              src: "/images/pass-that-there-gesture-storyboard-transparent.png",
              alt: "Gesture pass scenario storyboard",
              caption: "[Scenario]",
              width: 1024,
              height: 832,
            },
            {
              type: "image",
              src: "/images/pass-that-there-gesture.mp4",
              alt: "Gesture pass demo",
              caption: "[Demo]",
              width: 720,
              height: 720,
              controls: true,
              loop: false,
            },
            {
              type: "numbered",
              start: 2,
              items: [
                {
                  title: "Speech pass (Natural Language → UI)",
                  body: 'After selecting an object, the user speaks a natural phrase ("Want this?" "Share this cube" "Here, take it"). The system detects sharing intent, triggers the corresponding confirmation UI, and completes the pass; the receiver gets visual/auditory feedback that it arrived.',
                },
              ],
            },
            {
              type: "image",
              src: "/images/pass-that-there-voice-storyboard-transparent.png",
              alt: "Speech pass scenario storyboard",
              caption: "[Scenario]",
              width: 1024,
              height: 867,
            },
            {
              type: "image",
              src: "/images/pass-that-there-voice.mp4",
              alt: "Speech pass demo",
              caption: "[Demo]",
              width: 720,
              height: 720,
              controls: true,
              loop: false,
            },
            {
              type: "paragraph",
              text: 'Both designs deliberately keep the confirmation step: in a shared multi-user space, accidental triggers cost more. One confirmation is how we balance "natural" with "controllable."',
            },
          ],
        },
        {
          id: "build",
          level: 1,
          number: "5.",
          title: "Build",
          blocks: [
            {
              type: "paragraph",
              text: "Unity + OpenXR + Meta All-in-One SDK, running on Meta Quest 2 / Pro; multiplayer sync via Unity Netcode for GameObjects (NGO); gesture recognition via XR Hands; speech intent recognition via Wit.AI (Meta Voice SDK), mapping utterance to intent.",
            },
          ],
        },
        {
          id: "study",
          level: 1,
          number: "6.",
          title: "Study & Findings",
          blocks: [
            {
              type: "paragraph",
              text: "Method. A comparative evaluation with 5 participants of varying XR experience: each watched prototype videos of both techniques in randomized order, then rated five dimensions on a 7-point Likert scale — intuitiveness, cognitive load, physical comfort, control & feedback, and preference — plus open-ended feedback.",
            },
            {
              type: "paragraph",
              text: "Quantitative findings.",
            },
            {
              type: "bullets",
              items: [
                "Gesture felt more intuitive for spatial tasks (6.6/7), with stronger control, precision, immersion, and low latency — but weak visual feedback left users unsure whether gestures were recognized, and comfort dropped with prolonged use.",
                "Speech scored highest on collaborative efficiency (6.6/7): natural, conversational, and hands-free — but only suited clear interaction regions, and physical comfort was lowest for prolonged use (4.6/7).",
              ],
            },
            {
              type: "paragraph",
              text: 'Qualitative findings. Participant quotes capture the tradeoff: gesture was "more intuitive — I can control the whole process better"; speech "makes collaboration feel natural and fast, like being in a room with someone, not just wearing a headset."',
            },
            {
              type: "paragraph",
              text: "Preference split clearly: 2 favored gesture / 1 favored speech / 2 had no preference — 40% saw value in both.",
            },
            {
              type: "image",
              src: "/images/pass-that-there-study-results-1.png",
              alt: "Quantitative comparison and overall preference from the user study",
              caption: "[Study Results]",
              width: 1024,
              height: 439,
            },
            {
              type: "image",
              src: "/images/pass-that-there-study-results-2.png",
              alt: "Gesture-based and voice-based participant quotes from the user study",
              caption: "[Study Results]",
              width: 1024,
              height: 413,
            },
            {
              type: "paragraph",
              text: "Implications for design:",
            },
            {
              type: "bullets",
              items: [
                "No single best technique — design a context-adaptive hybrid so users can switch between speech and gesture by task and environment.",
                "Gesture needs stronger visual feedback (highlights, ripples, color changes) to confirm that the system understood in the moment.",
                "Next: more complex collaborative tasks closer to real workflows (e.g., co-designing a room interior), larger samples, and validation on Meta Quest 3.",
              ],
            },
          ],
        },
      ],
    },
    cn: {
      title: "Pass That There",
      description: "为 XR 协作任务设计更自然、更省力的交互方式",
      tags: ["XR", "HCI 研究", "交互技术设计"],
      advisor: "Prof. Brad Myers（CMU HCII 主任 · SIGCHI 终身成就奖）",
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "概述",
          blocks: [
            {
              type: "paragraph",
              text: "这是一个研究「XR 协作交互该怎么做」的项目：围绕「多人在 XR 里一起完成任务」这一场景，我们提出并原型化了两套自创的交互技术（手势 / 语音），并通过用户研究评估它们在直觉性、效率与疲劳上的表现。",
            },
          ],
        },
        {
          id: "background",
          level: 1,
          number: "2.",
          title: "研究背景",
          blocks: [
            {
              type: "paragraph",
              text: "协作正在成为 XR 的核心场景。从团队协作工作空间（如 Arkio 的多人建模）到多人游戏（如 Cards & Tankards），XR 越来越多地被用于「多人同处一个虚拟空间共同操作」。但支撑这些协作的交互技术，大多还沿用单人时代的方案。",
            },
            {
              type: "paragraph",
              text: "现有交互技术及其局限。目前 XR 里操作物体主要靠两类方式：一是捏取拖拽（pinch & drag）等自然手势，二是手柄激光笔（laser pointer）指向选取。它们在单人操作里够用，但放到「把东西递给协作者」这类协作动作上，既不够自然，也很快带来疲劳。",
            },
            {
              type: "paragraph",
              text: "核心痛点：大猩猩手臂（Gorilla Arm）。手长时间悬空指点、伸展，肩臂会迅速酸痛——这是 XR 交互公认的疲劳来源。持续的悬空操作，恰恰是协作场景里最频繁的动作。",
            },
            {
              type: "image",
              src: "/images/pass-that-there-gorilla-arm.png",
              alt: "VR 中手臂姿势变化——弯臂 vs 伸臂",
              caption:
                "[Lou et al., Arm Posture Changes in VR, Applied Sciences 2022. DOI: 10.3390/app12052585]",
              width: 885,
              height: 431,
            },
            {
              type: "paragraph",
              text: "研究问题：在 XR 里做协作任务时，哪种交互方式既能让人觉得自然直觉，又能尽量减少疲劳？",
            },
          ],
        },
        {
          id: "approach",
          level: 1,
          number: "3.",
          title: "设计思路：多模态交互及其谱系",
          blocks: [
            {
              type: "paragraph",
              text: "我们的判断是：与其优化单一的悬空手势，不如引入多模态交互（语音 + 微手势），用不同模态分担不同职责，减少持续悬空的负荷。",
            },
            {
              type: "paragraph",
              text: "这一思路可以直接上溯到多模态交互的开山之作：MIT 的 \"Put That There\"（Bolt, 1980）。那套 speak-and-point 系统的洞见是：让语音承载「意图」，让指向手势解决「指代」（说 \"put that there\"，\"that/there\" 由指向的坐标来确定），两种模态互补，既消除歧义，又比任何单一模态都更自然。",
            },
            {
              type: "paragraph",
              text: "我们把这个经典范式迁移到今天的 XR 协作：语音表达「我想分享」，手势 / 选择确定「分享哪个、给谁」，让协作动作回到接近现实的交流方式。",
            },
          ],
        },
        {
          id: "technique",
          level: 1,
          number: "4.",
          title: "自创的交互技术",
          blocks: [
            {
              type: "paragraph",
              text: "我们把宽泛的「协作」收敛到一个具体而高频的动作：在 VR 里把一个物体从一个人传递给另一个人（场景：Alex 和 Joe 一起搭一个 VR 乐高模型）。围绕它设计了两套技术，共享同一条设计原则——用一步轻量的 UI 确认来防止误触，让「表达意图」和「真正执行」分开：",
            },
            {
              type: "numbered",
              items: [
                {
                  title: "手势传递（Gesture → UI）",
                  body: "用户选中物体后，朝协作者抬起手掌——一个简单而有明确意图的动作；系统识别为「分享」意图并弹出确认，用户与 UI 交互即完成传递，物体出现在对方手中。",
                },
              ],
            },
            {
              type: "image",
              src: "/images/pass-that-there-gesture-storyboard-transparent.png",
              alt: "手势传递场景构想分镜",
              caption: "[场景构想]",
              width: 1024,
              height: 832,
            },
            {
              type: "image",
              src: "/images/pass-that-there-gesture.mp4",
              alt: "手势传递演示",
              caption: "[演示 Demo]",
              width: 720,
              height: 720,
              controls: true,
              loop: false,
            },
            {
              type: "numbered",
              start: 2,
              items: [
                {
                  title: "语音传递（Natural Language → UI）",
                  body: "用户选中物体后说出自然语句（\"Want this?\" \"Share this cube\" \"Here, take it\"）；系统识别其中的分享意图，触发对应 UI 确认后完成传递，接收方以视觉 / 听觉反馈确认收到。",
                },
              ],
            },
            {
              type: "image",
              src: "/images/pass-that-there-voice-storyboard-transparent.png",
              alt: "语音传递场景构想分镜",
              caption: "[场景构想]",
              width: 1024,
              height: 867,
            },
            {
              type: "image",
              src: "/images/pass-that-there-voice.mp4",
              alt: "语音传递演示",
              caption: "[演示 Demo]",
              width: 720,
              height: 720,
              controls: true,
              loop: false,
            },
            {
              type: "paragraph",
              text: "两套方案都刻意保留「确认」这一步：在多人共享的空间里，误触的代价更高，一步确认是把「自然」和「可控」平衡起来的关键。",
            },
          ],
        },
        {
          id: "build",
          level: 1,
          number: "5.",
          title: "原型构成",
          blocks: [
            {
              type: "paragraph",
              text: "Unity + OpenXR + Meta All-in-One SDK，运行于 Meta Quest 2 / Pro；多人实时同步用 Unity Netcode for GameObjects（NGO）；手势识别用 XR Hands；语音意图识别用 Wit.AI（Meta Voice SDK，把「话语」映射到「意图」）。",
            },
          ],
        },
        {
          id: "study",
          level: 1,
          number: "6.",
          title: "用户研究与发现",
          blocks: [
            {
              type: "paragraph",
              text: "方法。对 5 位有不同 XR 经验的用户做对照评测：每人以随机顺序观看两种技术的原型视频，再用 7 点李克特量表从五个维度打分——直觉性、认知负荷、身体舒适度、控制与反馈、偏好，并附开放式反馈。",
            },
            {
              type: "paragraph",
              text: "定量发现。",
            },
            {
              type: "bullets",
              items: [
                "手势在空间任务上更直觉（6.6/7），控制感与精度更强、更沉浸，延迟低；但视觉反馈偏弱——用户常不确定手势有没有被识别，长时间使用舒适度下降。",
                "语音在协作效率上最高（6.6/7），自然、像真人对话、可解放双手；但只适用于清晰的交互区域，且长时间使用的身体舒适度最低（4.6/7）。",
              ],
            },
            {
              type: "paragraph",
              text: "定性发现。用户原话很能说明问题：手势「更直觉、我能更好地控制整个过程」；语音「让协作感觉自然、快速、像真的和人在一个房间里，而不只是戴着头显」。",
            },
            {
              type: "paragraph",
              text: "偏好呈明显分裂：2 人偏手势 / 1 人偏语音 / 2 人无偏好——40% 的人认为两者各有价值。",
            },
            {
              type: "image",
              src: "/images/pass-that-there-study-results-1.png",
              alt: "用户研究中的定量对比与总体偏好",
              caption: "[用户研究结果]",
              width: 1024,
              height: 439,
            },
            {
              type: "image",
              src: "/images/pass-that-there-study-results-2.png",
              alt: "用户研究中的手势与语音访谈摘录",
              caption: "[用户研究结果]",
              width: 1024,
              height: 413,
            },
            {
              type: "paragraph",
              text: "结论（对设计的启示）：",
            },
            {
              type: "bullets",
              items: [
                "没有单一最优解，应做成情境自适应的混合方案——让用户按任务与环境在语音 / 手势间切换。",
                "手势交互亟需更强的视觉反馈（高亮、涟漪、颜色变化）来即时确认「系统听懂了」。",
                "下一步：引入更贴近真实工作流的复杂协作任务（如共同设计一个房间的室内）、扩大样本、并迁移到 Meta Quest 3 上继续验证。",
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "crazy-baby-alarm",
    image: "/images/crazy-baby-alarm-cover.png",
    imageAlt:
      "Concept sketch of Crazy Baby Alarm — a star-faced wheeled robot alarm with camera, LED, and display",
    showInHomeGrid: false,
    en: {
      title: "Crazy Baby Alarm",
      description: "A performative robot",
      tags: [
        "Creative Robotics",
        "Human-Robot Interaction (HRI)",
        "Physical Computing",
      ],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "Crazy Baby Alarm is a desktop alarm robot — like a little companion that works alongside you on tasks: you set a time, it reminds you when it's due, and it expresses emotion through facial expressions and movement. It explores what happens when a robot becomes an expressive medium — interacting with people through embodied behavior and emotion — and how people respond to and regard it.",
            },
            {
              type: "mediaRow",
              items: [
                {
                  src: "/images/crazy-baby-alarm-prototype.png",
                  alt: "Crazy Baby Alarm concept sketch with component notes",
                  width: 1400,
                  height: 959,
                },
                {
                  src: "/images/crazy-baby-alarm-overview.mp4",
                  alt: "Crazy Baby Alarm demo",
                  width: 406,
                  height: 720,
                },
              ],
            },
          ],
        },
        {
          id: "detail-design",
          level: 1,
          number: "2.",
          title: "Detail Design",
          blocks: [
            {
              type: "numbered",
              items: [
                {
                  title: "Five states",
                  body: "Sleep → Idle → Alarm → Tantrum → Soothe.",
                },
              ],
            },
            {
              type: "image",
              src: "/images/crazy-baby-alarm-states.gif",
              alt: "Crazy Baby Alarm five states demo",
              width: 640,
              height: 416,
            },
            {
              type: "numbered",
              start: 2,
              items: [
                {
                  title: "Functions",
                  body: 'Timed reminders; express emotion through "eyes + pointers"; switch states and react based on how the user interacts — press correctly, press wrong, or leave it alone.',
                },
                {
                  title: "Build",
                  body: 'A pair of servo-driven movable "eyes" plus two pointers as "arms"; Arduino as the main controller; an LCD on the back for real time and an interaction button on the front; gears and structural parts are 3D printed.',
                },
              ],
            },
            {
              type: "mediaRow",
              items: [
                {
                  src: "/images/crazy-baby-alarm-motion-notes.png",
                  alt: "Motion notes — wobble and rage turn with sail winch servo",
                  width: 1200,
                  height: 943,
                },
                {
                  src: "/images/crazy-baby-alarm-back.png",
                  alt: "Crazy Baby Alarm back view with LCD and controls",
                  width: 900,
                  height: 1200,
                },
                {
                  src: "/images/crazy-baby-alarm-build.png",
                  alt: "Crazy Baby Alarm internal build — servos, gears, and Arduino",
                  width: 1400,
                  height: 1050,
                },
              ],
            },
          ],
        },
      ],
    },
    cn: {
      title: "Crazy Baby Alarm",
      description: "一台会表演的机器人",
      tags: ["创意机器人", "人机交互 (HRI)", "物理计算"],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "概述",
          blocks: [
            {
              type: "paragraph",
              text: "Crazy Baby Alarm 是一个放在桌上的闹钟机器人，像一个陪你做任务的「小伙伴」：你设定时间，它到点提醒你，同时会用表情和动作表达情绪。旨在探究当机器人成为一种表达性的媒介，用具身的行为和情绪去和人互动时，人会如何回应和看待它。",
            },
            {
              type: "mediaRow",
              items: [
                {
                  src: "/images/crazy-baby-alarm-prototype.png",
                  alt: "Crazy Baby Alarm 概念草图与部件说明",
                  width: 1400,
                  height: 959,
                },
                {
                  src: "/images/crazy-baby-alarm-overview.mp4",
                  alt: "Crazy Baby Alarm 演示",
                  width: 406,
                  height: 720,
                },
              ],
            },
          ],
        },
        {
          id: "detail-design",
          level: 1,
          number: "2.",
          title: "细节设计",
          blocks: [
            {
              type: "numbered",
              items: [
                {
                  title: "五种状态",
                  body: "Sleep（沉睡）→ Idle（待机）→ Alarm（响铃）→ Tantrum（耍脾气）→ Soothe（被安抚）。",
                },
              ],
            },
            {
              type: "image",
              src: "/images/crazy-baby-alarm-states.gif",
              alt: "Crazy Baby Alarm 五种状态演示",
              width: 640,
              height: 416,
            },
            {
              type: "numbered",
              start: 2,
              items: [
                {
                  title: "功能",
                  body: "定时提醒；通过「眼睛 + 指针」表达情绪；根据用户互动操作（按对 / 按错 / 晾着不管）切换状态并做出反应。",
                },
                {
                  title: "构成",
                  body: "一对舵机驱动的可动「眼睛」+ 两根当作「手臂」的指针；主控用 Arduino；背面有一块 LCD 屏显示实际时间，正面设一个交互按钮；齿轮与结构件为 3D 打印。",
                },
              ],
            },
            {
              type: "mediaRow",
              items: [
                {
                  src: "/images/crazy-baby-alarm-motion-notes.png",
                  alt: "动作笔记——摆动与 Rage Turn，以及 sail winch 舵机",
                  width: 1200,
                  height: 943,
                },
                {
                  src: "/images/crazy-baby-alarm-back.png",
                  alt: "Crazy Baby Alarm 背面——LCD 与控制按钮",
                  width: 900,
                  height: 1200,
                },
                {
                  src: "/images/crazy-baby-alarm-build.png",
                  alt: "Crazy Baby Alarm 内部结构——舵机、齿轮与 Arduino",
                  width: 1400,
                  height: 1050,
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "3-classic-icon-families",
    image: "/images/article-3-classic-16-9@2x.png",
    imageAlt:
      "Examples of icons from the NYC Transit System, Olympic Games, and the original Macintosh computer",
    ...blankCopy(
      "3 Classic Icon Families",
      "Celebrate the power of iconography through 3 achievements in modern design.",
      "三个经典图标家族",
      "通过三项现代设计成就，看见图标的力量。",
    ),
  },
  {
    slug: "icon-grids-keylines-demystified",
    image: "/images/article-icon-grids-16-9@2x.png",
    imageAlt: "A smiley-face icon placed on a grid illustrating its proportions",
    ...blankCopy(
      "Icon Grids & Keylines Demystified",
      "A breakdown of icon grids — purpose, anatomy, and in-depth examples.",
      "图标网格与关键线解析",
      "拆解图标网格：用途、结构，以及深入案例。",
    ),
  },
  {
    slug: "mwow-tunnel",
    image: "/images/mwow-tunnel-cover.png",
    imageAlt:
      "MWOW TUNNEL — modular cat furniture with pipe frame, platforms, tunnels, and cats",
    en: {
      title: "MWOW TUNNEL",
      description:
        "A modular product system that turns room dimensions, structural rules, and cat behaviors into configurable furniture.",
      tags: [
        "Computational Design",
        "Product Design",
        "Physical Prototyping",
      ],
      timeline: [
        "2022 · Undergraduate entrepreneurship project",
        "2026 · AI retrospective exploration",
      ],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "This is a digital cat furniture project from an undergraduate entrepreneurship course. Rather than designing a single model, we set out to build a cat tree product system that can adapt to different living spaces and use needs. The team delivered a product concept built from standardized tubing, swappable function modules, a generative algorithm, and a digital configuration interface: users enter room dimensions and functional requirements; the system generates candidate forms under structural rules; then function, material, and color configuration produce a final scheme that maps to physical components for fabrication and installation.",
            },
            {
              type: "architectureFlow",
              caption: "[System Architecture]",
              realWorld: "Real World",
              inputs: [
                { title: "Spatial Scan", subtitle: "LiDAR / AR" },
                { title: "Natural Language", subtitle: "Voice / Text" },
                { title: "Cat Profile", subtitle: "Behavior" },
              ],
              transferLabel: "Structured Design Constraints",
              stages: [
                {
                  title: "AI Understanding",
                  subtitle: "Multimodal AI",
                  emphasize: true,
                },
                {
                  title: "Generative Design Engine",
                  subtitle: "Voxelization → Rules → Optimization",
                  emphasize: true,
                },
                { title: "Candidate Structures" },
                {
                  title: "Product Configuration",
                  subtitle: "Structure + Functional Modules + Material",
                },
                { title: "Final Configuration" },
              ],
              branch: {
                left: [
                  { title: "BOM / Supply" },
                  { title: "Standard Components" },
                  { title: "AI Assembly Guide" },
                  { title: "Physical Product" },
                  { title: "AI Maintenance" },
                  { title: "Usage / Material Data" },
                ],
                right: { title: "AR Preview" },
              },
              loopNote:
                "↺ Usage / material data feeds back into AI Understanding for ongoing product and material optimization.",
            },
          ],
        },
        {
          id: "problem-definition",
          level: 1,
          number: "2.",
          title: "Problem definition: Fixed furniture, changing homes",
          blocks: [
            {
              type: "paragraph",
              text: "As the pet economy continues to grow, cat furniture has been shifting from basic pet supplies toward home products tied to living space, pet behavior, and household lifestyle. But in early market and user research, we found that most existing cat trees are sold as fixed-size, fixed-structure, fixed-function combinations. Users have to hunt for a “relatively suitable” option among finished products, while the products themselves rarely change with the real environment of use.",
            },
            {
              type: "paragraph",
              text: "On one hand, households differ in the space dimensions and layout conditions they can give to cat furniture: the same cat tree may fit a spacious living room but fail to enter a narrow windowsill, corner, or other constrained space.",
            },
            {
              type: "paragraph",
              text: "On the other hand, how cats interact with furniture also varies. Climbing, jumping, resting, hiding, scratching, and playing call for different heights, paths, and function modules; the number of cats, their ages, and activity levels further reshape those needs.",
            },
            {
              type: "paragraph",
              text: "So we asked:",
            },
            {
              type: "quote",
              text: "Can cat furniture generate different structural and functional configurations according to different spatial constraints and use needs?",
            },
          ],
        },
        {
          id: "from-observation-to-rules",
          level: 1,
          number: "3.",
          title: "From observation to rules",
          blocks: [
            {
              type: "paragraph",
              text: "A generative system cannot simply produce more shapes. It needs to understand what makes a shape useful. We translated observations from cat cafés, existing products, material research, and physical builds into four sets of design constraints.",
            },
            {
              type: "infoCards",
              cards: [
                {
                  title: "Cat Behavior",
                  items: ["Climb", "Perch", "Hide", "Scratch", "Rest"],
                  footer:
                    "These behaviors informed the placement and type of functional modules.",
                },
                {
                  title: "Spatial Constraints",
                  items: ["Width", "Depth", "Height", "Available footprint"],
                  footer:
                    "These defined the boundary within which a configuration could grow.",
                },
                {
                  title: "Structural Constraints",
                  items: [
                    "Support points",
                    "Span length",
                    "Cantilever",
                    "Load distribution",
                    "Connectivity",
                  ],
                  footer:
                    "These determined whether a generated geometry could become a stable physical structure.",
                },
                {
                  title: "Fabrication Constraints",
                  items: [
                    "Standard pipe dimensions",
                    "Available connectors",
                    "Replaceable modules",
                    "Assembly complexity",
                    "Material cost",
                  ],
                  footer:
                    "These connected computational geometry with components that could actually be sourced and assembled.",
                },
              ],
            },
          ],
        },
        {
          id: "product-architecture",
          level: 1,
          number: "4.",
          title: "Designing the product architecture",
          blocks: [
            {
              type: "paragraph",
              text: "The architecture separates the structural frame from functional modules, and evolves generation from free assembly to constraint-based search and optimization.",
            },
          ],
        },
        {
          id: "separating-structure-and-function",
          level: 2,
          number: "4.1",
          title: "Separating structure and function",
          blocks: [
            {
              type: "paragraph",
              text: "Our earliest design used larger-diameter pipes that were meant to carry structure, circulation space, and functional elements all at once. Physical experiments quickly exposed several problems: the parts were bulky, hard to transport, intolerant of assembly tolerances, and prone to instability in cantilevered configurations. So we chose a thinner pipe system as the structural frame, while larger components became attachable functional modules.",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-design-manuscript.png",
              alt: "Design manuscript sketches for modular cat furniture forms and structure",
              caption: "[Design Manuscript]",
              width: 986,
              height: 440,
            },
          ],
        },
        {
          id: "building-generation-logic",
          level: 2,
          number: "4.2",
          title: "Building the generation logic",
          blocks: [
            {
              type: "paragraph",
              text: "From form generation to constraint-based generation. We first voxelized the available space — discretizing continuous space into computable 3D cells — then explored how to generate tubular structures within those cells.",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-spatial-voxelization.png",
              alt: "Spatial Voxelization — four steps from space scan to layered block data",
              caption: "[Spatial Voxelization]",
              width: 860,
              height: 418,
            },
            {
              type: "paragraph",
              text: "The generation logic went through three iterations: first allowing users to freely assemble components in discrete space; then adding structural rules to constrain feasible forms; and finally introducing optimization algorithms so the system could automatically search for better structures among a large set of possible solutions.",
            },
          ],
        },
        {
          id: "v1-free-form-assembly",
          level: 2,
          number: "",
          title: "V1 — Free-form Assembly",
          blocks: [
            {
              type: "paragraph",
              text: "The first approach was inspired by LEGO-like modular systems.",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-v1-first-generation-logic.png",
              alt: "First-generation logic — basic units, combinations, form generation, and evaluation",
              caption: "[First-Generation Logic]",
              width: 781,
              height: 560,
            },
            {
              type: "paragraph",
              text: "We divided the design space into a discrete voxel grid and defined a set of base pipe parts that could connect along X, Y, and Z. By combining one, two, or three pipes, we built basic spatial units, then assembled those units into more complex 3D structures. Free combination produced a large number of forms, but it also exposed an important limitation:",
            },
            {
              type: "quote",
              text: "A product that is geometrically valid may still be structurally and assembly-wise unreasonable.",
            },
          ],
        },
        {
          id: "v2-constraint-based-generation",
          level: 2,
          number: "",
          title: "V2 — Constraint-based Generation",
          blocks: [
            {
              type: "paragraph",
              text: "In the second phase, we no longer started from “how pipes can be joined,” but from the opposite question: what conditions must a viable spatial structure satisfy? The voxelized space was further split into horizontal layers at different heights, and candidate nodes defined where structure could appear on each layer.",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-v2-second-generation-logic.png",
              alt: "Second-generation logic — plane generation rules and structure generation candidates",
              caption: "[Second-Generation Logic]",
              width: 800,
              height: 903,
            },
            {
              type: "numbered",
              items: [
                {
                  title: "Ground layer",
                  body: "The ground layer carries most of the cat tree’s load-bearing and stability, so it needs more support nodes and a larger footprint on the floor.",
                },
                {
                  title: "Intermediate layers",
                  body: "Middle layers balance structural stability with room for activity, allowing more paths and connection patterns.",
                },
                {
                  title: "Upper layers",
                  body: "Closer to the top, fewer supports can be relied on, so node count and structural density decrease to avoid unstable cantilevers.",
                },
              ],
            },
            {
              type: "paragraph",
              text: "From spatial rules to candidate structures",
            },
            {
              type: "paragraph",
              text: "Once feasible node combinations were set for each floor, the system could combine different levels into a series of 3D skeletons that satisfy basic spatial constraints. Even then, the number of feasible solutions remained very large — and “meeting the rules” did not mean “a better structure.” That led to a third round of optimization.",
            },
          ],
        },
        {
          id: "v3-optimization-based-generation",
          level: 2,
          number: "",
          title: "V3 — Optimization-based Generation",
          blocks: [
            {
              type: "paragraph",
              text: "In the third version, the system no longer enumerates and displays every possible structure. Instead, under basic spatial and structural constraints, it searches and scores candidate schemes. Reducing redundant members became one of the optimization goals, while keeping connections that still meet structural and functional needs. I used a genetic algorithm and simulated annealing to search the candidate space continuously, filtering and iterating structures by fitness. After structural selection, I ran stability and mechanical analysis to finalize the generated schemes.",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-v3-algorithm-results.png",
              alt: "Third-generation logic — algorithm results and structural application strategy",
              caption: "[Third-Generation Logic]",
              width: 804,
              height: 649,
            },
          ],
        },
        {
          id: "user-facing-product-experience",
          level: 1,
          number: "5.",
          title: "User-facing product experience",
          blocks: [
            {
              type: "paragraph",
              text: "When the project was first completed, we took generative design further into a consumer-facing customization flow. Users could enter a customization area from the homepage, set generation conditions by entering available space size and primary functional needs; the system then offered different structural schemes. Users could further adjust functional components, materials, and colors, and preview the final result in real space through AR. After confirming a scheme, they could review product information, complete the purchase, and assemble from a digital manual.",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-user-flow-en.png",
              alt: "User flow from homepage through customization, AR preview, purchase, and assembly manual",
              caption: "[User Flow]",
              width: 616,
              height: 307,
            },
            {
              type: "paragraph",
              text: "Revisiting that flow, I found that while users could change product form, customization still mostly depended on preset parameters such as space dimensions and function choices. Users had to translate real-life needs into options the system could understand, while differences in cat behavior, household context, and how the product wore over time never really entered the design process.",
            },
            {
              type: "paragraph",
              text: "So I tried bringing in AI so the system could understand fuller, more natural use situations:",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-system-overview.jpg",
              alt: "System overview from real-world needs to personalized cat furniture, including AI maintenance feedback loop",
              caption: "[System Overview]",
              width: 1024,
              height: 728,
            },
            {
              type: "numbered",
              items: [
                {
                  title: "Before purchase",
                  body: "Users can describe the home environment, the cat’s personality and habits, and their own needs through space photos plus natural language. AI turns that into design constraints, then hands them to the existing generation system to produce schemes.",
                },
                {
                  title: "During purchase",
                  body: "The final structure and BOM can further become a personalized assembly guide matched to that order.",
                },
                {
                  title: "After use",
                  body: "Users can keep logging how modules and materials are used and worn; AI helps with maintenance and replacement advice, and long-term feedback feeds future material and product optimization.",
                },
              ],
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-wireframe.png",
              alt: "Wireframe flow of the customization app from discovery to purchase",
              caption: "[Wireframe]",
              width: 1024,
              height: 389,
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-ui-design.png",
              alt: "MWOW TUNNEL product UI — home, customization, AR preview, and installation instructions",
              caption: "[Interface Design]",
              width: 1024,
              height: 463,
            },
            {
              type: "image",
              src: "/videos/mwow-tunnel-promo.mp4",
              alt: "MWOW TUNNEL product trailer",
              caption: "[Product Trailer]",
              width: 1920,
              height: 1080,
              controls: true,
              loop: false,
            },
          ],
        },
      ],
    },
    cn: {
      title: "喵喵塔",
      description:
        "一套模块化产品系统，把房间尺寸、结构规则与猫咪行为转化为可配置的家具。",
      tags: ["计算设计", "产品设计", "实体原型"],
      timeline: [
        "2022 年 · 本科生创业项目",
        "2026 年 · 人工智能回顾性探索",
      ],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "项目概览",
          blocks: [
            {
              type: "paragraph",
              text: "这是一个本科创业课程中的数字化猫家具项目。我们希望建立一套可以适应不同居住空间和使用需求的猫爬架产品系统，而不是设计单一款式。最终，团队完成了一套由标准化管件、可替换功能模块、生成算法和数字化配置界面组成的产品方案：用户输入空间尺寸和功能需求后，系统在结构规则下生成候选形态，再通过功能、材质与颜色配置形成最终方案，并对应到实际构件进行制作与安装。",
            },
            {
              type: "architectureFlow",
              caption: "[系统架构]",
              realWorld: "真实世界",
              inputs: [
                { title: "空间扫描", subtitle: "LiDAR / AR" },
                { title: "自然语言", subtitle: "语音 / 文本" },
                { title: "猫咪画像", subtitle: "行为" },
              ],
              transferLabel: "结构化设计约束",
              stages: [
                {
                  title: "AI 理解",
                  subtitle: "多模态 AI",
                  emphasize: true,
                },
                {
                  title: "生成式设计引擎",
                  subtitle: "体素化 → 规则 → 优化",
                  emphasize: true,
                },
                { title: "候选结构" },
                {
                  title: "产品配置",
                  subtitle: "结构 + 功能模块 + 材质",
                },
                { title: "最终配置" },
              ],
              branch: {
                left: [
                  { title: "BOM / 供应链" },
                  { title: "标准构件" },
                  { title: "AI 组装指南" },
                  { title: "实体产品" },
                  { title: "AI 维护" },
                  { title: "使用 / 材料数据" },
                ],
                right: { title: "AR 预览" },
              },
              loopNote:
                "↺ 使用 / 材料数据回馈至 AI 理解，持续优化产品与材料。",
            },
          ],
        },
        {
          id: "problem-definition",
          level: 1,
          number: "2.",
          title: "问题定义：固定家具，多变居所",
          blocks: [
            {
              type: "paragraph",
              text: "随着宠物经济持续增长，猫家具逐渐从基础宠物用品转向与居住空间、宠物行为和家庭生活方式相关的家居产品。但在前期市场与用户调研中，我们发现，现有猫爬架大多以固定尺寸、固定结构和固定功能组合出售。用户需要从已有产品中寻找一个“相对合适”的选择，而产品本身很少能够根据真实使用环境发生变化。",
            },
            {
              type: "paragraph",
              text: "一方面，不同家庭能够提供给猫家具的空间尺寸和布局条件不同：同一款猫爬架可能适合宽敞客厅，却无法进入狭窄的窗边、墙角或其他有限空间。",
            },
            {
              type: "paragraph",
              text: "另一方面，猫与家具的互动方式也具有差异。攀爬、跳跃、休息、躲藏、磨爪和玩耍对应着不同的高度、路径和功能模块；猫的数量、年龄和活动能力也会进一步改变这些需求。",
            },
            {
              type: "paragraph",
              text: "因此，我们提出问题：",
            },
            {
              type: "quote",
              text: "能否让猫家具根据不同的空间限制与使用需求，产生不同的结构和功能配置？",
            },
          ],
        },
        {
          id: "from-observation-to-rules",
          level: 1,
          number: "3.",
          title: "从观察到规则",
          blocks: [
            {
              type: "paragraph",
              text: "生成系统不能简单地生成更多形状。它需要理解是什么使一种形状有用。我们将从猫咪咖啡馆、现有产品、材料研究和实体建造中获得的观察结果转化为四组设计约束。",
            },
            {
              type: "infoCards",
              cards: [
                {
                  title: "猫咪行为",
                  items: ["攀爬", "栖息", "躲藏", "磨爪", "休息"],
                  footer: "这些行为决定了功能模块的放置位置与类型。",
                },
                {
                  title: "空间约束",
                  items: ["宽度", "进深", "高度", "可用占地"],
                  footer: "这些界定了配置可扩展的边界。",
                },
                {
                  title: "结构约束",
                  items: ["支撑点", "跨度", "悬挑", "荷载分布", "连接关系"],
                  footer: "这些决定了生成几何能否成为稳定的实体结构。",
                },
                {
                  title: "制造约束",
                  items: [
                    "标准管件尺寸",
                    "可用连接件",
                    "可替换模块",
                    "组装复杂度",
                    "材料成本",
                  ],
                  footer:
                    "这些把计算几何与可采购、可组装的实际构件连接起来。",
                },
              ],
            },
          ],
        },
        {
          id: "product-architecture",
          level: 1,
          number: "4.",
          title: "设计产品架构",
          blocks: [
            {
              type: "paragraph",
              text: "产品架构将结构框架与功能模块分离，生成逻辑则从自由组装走向基于约束的搜索与优化。",
            },
          ],
        },
        {
          id: "separating-structure-and-function",
          level: 2,
          number: "4.1",
          title: "结构与功能分离",
          blocks: [
            {
              type: "paragraph",
              text: "我们最初的设计方案选取直径较大的管道同时承担结构、流通空间和功能元件的功能。实际实验很快暴露出几个问题：这些组件笨重、难以运输、对装配公差要求高，而且悬臂式结构容易出现不稳定性。因此我们选择了更细的管道系统成为结构框架，而较大的组件则成为可连接的功能模块。",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-design-manuscript.png",
              alt: "猫家具模块与结构探索的设计手稿",
              caption: "[设计手稿]",
              width: 986,
              height: 440,
            },
          ],
        },
        {
          id: "building-generation-logic",
          level: 2,
          number: "4.2",
          title: "构建生成逻辑",
          blocks: [
            {
              type: "paragraph",
              text: "从表单生成到基于约束的生成。我们首先将可用空间体素化，把连续空间离散为可计算的三维单元，再探索如何在这些单元中生成管状结构。",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-spatial-voxelization.png",
              alt: "空间体素化——从空间扫描到分层块体数据的四步流程",
              caption: "[空间体素化]",
              width: 860,
              height: 418,
            },
            {
              type: "paragraph",
              text: "生成逻辑经历了三次迭代：最初允许用户在离散空间中自由组合构件；随后加入结构规则，对可行形态进行约束；最终引入优化算法，让系统能够在大量可能解中自动寻找更优结构。",
            },
          ],
        },
        {
          id: "v1-free-form-assembly",
          level: 2,
          number: "",
          title: "V1 — 自由式组装",
          blocks: [
            {
              type: "paragraph",
              text: "最初的思路来自类似 LEGO 的模块化系统。",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-v1-first-generation-logic.png",
              alt: "第一代生成逻辑——基本单元、组合、形态生成与评估",
              caption: "[第一代生成逻辑]",
              width: 781,
              height: 560,
            },
            {
              type: "paragraph",
              text: "我们将设计空间划分为离散的体素网格，并定义了一组可以沿 X、Y、Z 三个方向连接的基础管件。通过组合一根、两根或三根管道，建立基本空间单元，再将这些单元继续组合成更复杂的三维结构。自由组合可以产生大量形态，但也暴露出一个重要的局限性：",
            },
            {
              type: "quote",
              text: "几何形状有效的产品在结构方面和装配效率可能不合理。",
            },
          ],
        },
        {
          id: "v2-constraint-based-generation",
          level: 2,
          number: "",
          title: "V2 — 基于约束的生成",
          blocks: [
            {
              type: "paragraph",
              text: "第二阶段，我们不再从“管件可以怎么拼”出发，而是反过来从一个可成立的空间结构需要满足什么条件出发。体素化的空间被进一步拆分为不同高度的水平层，并通过候选节点定义每一层可能出现的结构。",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-v2-second-generation-logic.png",
              alt: "第二代生成逻辑——平面生成规则与结构生成候选",
              caption: "[第二代生成逻辑]",
              width: 800,
              height: 903,
            },
            {
              type: "numbered",
              items: [
                {
                  title: "底层",
                  body: "底层承担整个猫爬架的主要承重和稳定作用，因此需要更多支撑节点和更大的接地范围。",
                },
                {
                  title: "中层",
                  body: "中层在结构稳定与活动空间之间取得平衡，可以产生更多路径和连接方式。",
                },
                {
                  title: "顶层",
                  body: "越靠近顶部，能够依赖的支撑结构越少，因此减少节点数量和结构密度，避免形成不稳定的悬挑。",
                },
              ],
            },
            {
              type: "paragraph",
              text: "从空间规则得到候选结构",
            },
            {
              type: "paragraph",
              text: "在确定每一层的可行节点组合后，系统可以将不同楼层进行组合，生成一系列满足基础空间约束的三维骨架。但即使这样，可行解的数量依然非常大，而且“满足规则”并不意味着“就是更好的结构”，因此我进行了第三次优化。",
            },
          ],
        },
        {
          id: "v3-optimization-based-generation",
          level: 2,
          number: "",
          title: "V3 — 基于优化的生成",
          blocks: [
            {
              type: "paragraph",
              text: "在第三个版本中，系统不再穷举并展示所有可能结构，而是在满足基本空间与结构约束的前提下，对候选方案进行搜索和评分。我将减少冗余杆件数量作为优化目标之一，同时保留满足结构与功能需求的连接关系。我分别使用遗传算法与模拟退火算法，在候选空间中持续搜索，并根据适应度对结构进行筛选与迭代。并在结构筛选完成后，进行了结构稳定性的分析和力学分析，最终确定生成方案。",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-v3-algorithm-results.png",
              alt: "第三代生成逻辑——算法结果与结构应用策略",
              caption: "[第三代生成逻辑]",
              width: 804,
              height: 649,
            },
          ],
        },
        {
          id: "user-facing-product-experience",
          level: 1,
          number: "5.",
          title: "用户端产品体验",
          blocks: [
            {
              type: "paragraph",
              text: "项目最初完成时，我们将生成式设计进一步转化为了一套面向消费者的定制流程。用户可以从首页进入定制专区，通过输入可用空间大小和主要功能需求确定生成条件；系统据此提供不同结构方案，用户可以进一步调整功能组件、材质和颜色，并通过 AR 在真实空间中预览最终效果。确认方案后，用户可以查看产品信息、完成购买，并根据数字说明书进行组装。",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-user-flow-cn.png",
              alt: "从首页到定制、AR 预览、购买与说明书的用户流程图",
              caption: "[用户流程]",
              width: 589,
              height: 300,
            },
            {
              type: "paragraph",
              text: "重新审视原有流程时，我发现它虽然允许用户改变产品形态，但定制仍主要依赖空间尺寸、功能选择等预设参数。用户需要自己把真实生活中的需求转化为系统能够理解的选项，而猫的行为差异、家庭环境以及产品长期使用状态并没有真正进入设计过程。",
            },
            {
              type: "paragraph",
              text: "因此，我尝试引入 AI，让系统能够理解更自然、更完整的使用情境：",
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-system-overview.jpg",
              alt: "从真实世界需求到个性化猫家具的系统概览，含 AI 维护与反馈循环",
              caption: "[系统概览]",
              width: 1024,
              height: 728,
            },
            {
              type: "numbered",
              items: [
                {
                  title: "购买前",
                  body: "用户可以通过空间照片 + 自然语言直接描述家庭环境、猫咪性格与行为习惯以及自己的需求，AI 将这些信息转化为设计约束，再交由原有生成系统产生方案。",
                },
                {
                  title: "购买中",
                  body: "最终生成的结构与 BOM 可以进一步转化为与该订单匹配的个性化组装指南。",
                },
                {
                  title: "使用后",
                  body: "用户可以持续记录模块和材料的使用、磨损情况，AI 辅助提供维护与更换建议，并将长期反馈用于未来的材料与产品优化。",
                },
              ],
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-wireframe.png",
              alt: "定制应用从浏览到购买的框架流程图",
              caption: "[框架]",
              width: 1024,
              height: 389,
            },
            {
              type: "image",
              src: "/images/mwow-tunnel-ui-design.png",
              alt: "喵喵塔产品界面——首页、定制、AR 预览与安装说明",
              caption: "[界面设计]",
              width: 1024,
              height: 463,
            },
            {
              type: "image",
              src: "/videos/mwow-tunnel-promo.mp4",
              alt: "喵喵塔产品宣传片",
              caption: "[产品宣传片]",
              width: 1920,
              height: 1080,
              controls: true,
              loop: false,
            },
          ],
        },
      ],
    },
  },
];

export const homeProjects = projects.filter((p) => p.showInHomeGrid !== false);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectHref(lang: ProjectLang, slug: string): string {
  return `/projects/${lang}/${slug}/`;
}
