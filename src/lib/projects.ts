export type ProjectLang = "en" | "cn";

export type ContentBlock =
  | { type: "paragraph"; text: string }
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
    }
  | {
      type: "mediaRow";
      items: {
        src: string;
        alt: string;
        width: number;
        height: number;
      }[];
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
  tags: ["AI Products", "0-to-1 Growth", "Vibecoding"],
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
    slug: "foundations-of-iconography",
    image: "/images/article-foundations-16-9@2x.png",
    imageAlt: "Specimens of an email icon, a globe icon, and a fingerprint icon",
    ...blankCopy(
      "Foundations of Iconography",
      "What are icons? What are their benefits and what are they used to achieve?",
      "图标学基础",
      "什么是图标？它们有什么价值，又用来达成什么目标？",
    ),
  },
];

export const homeProjects = projects.filter((p) => p.showInHomeGrid !== false);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectHref(lang: ProjectLang, slug: string): string {
  return `/projects/${lang}/${slug}/`;
}
