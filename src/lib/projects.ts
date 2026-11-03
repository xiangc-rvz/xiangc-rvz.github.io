export type ProjectLang = "en" | "cn";

export type ContentBlock =
  | { type: "paragraph"; text: string; spacedTop?: boolean }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; plain?: boolean; spaced?: boolean }
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
    }
  | {
      type: "seedTree";
      caption: string;
      root: string;
      midLeft: string;
      midCenter: string;
      midRight: string;
      queriesLabel: string;
      top: string;
    }
  | {
      type: "workflowStrip";
      caption: string;
      steps: { title: string; body: string }[];
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
  tags: ["产品设计", "AI 工作流设计", "原型设计"],
  sections: [
    {
      id: "product-definition",
      level: 1,
      number: "1.",
      title: "产品定义",
      blocks: [
        {
          type: "paragraph",
          text: "Reddit Growth OS 是一个基于真实 Reddit 内容证据的 AI 增长研究工具。我将自己在 Reddit 冷启动中的工作方法抽象成一套 AI 增强工作流，帮助早期产品从模糊的产品想法出发，发现潜在用户正在表达需求的场景，并将这些信号转化为可执行、可复盘的增长行动。",
        },
        {
          type: "heading",
          text: "产品 Demo",
        },
        {
          type: "image",
          src: "/videos/reddit-growth-os-demo.mp4",
          alt: "Reddit Growth OS 产品演示视频",
          width: 1806,
          height: 1080,
          controls: true,
          loop: false,
        },
      ],
    },
    {
      id: "project-background",
      level: 1,
      number: "2.",
      title: "项目背景：从一次真实的 Reddit 增长实践开始",
      blocks: [
        {
          type: "paragraph",
          text: "我在一家美国 AI startup 做 Reddit 增长时，曾通过运营在一周内带来 200+ 用户和 30K+ 自然流量。这个过程中我发现真正花费我最多时间的，并不是写帖子，而是不断判断：我应该去哪里找到真正可能需要这个产品的人？以及做完之后，我怎么知道什么真的有效？Reddit 的增长逻辑和传统渠道很不一样。用户分散在大量高度自治的社区中，每个 subreddit 都有自己的语言、规则和对推广内容的容忍边界。对于用户画像尚未稳定的 0→1 产品，这带来了两个反复出现的问题。",
        },
        {
          type: "numbered",
          items: [
            {
              title: "找到“相关社区”，不等于找到“有需求的人”",
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
          text: "因此，我把问题拆成两个闭环。",
        },
        {
          type: "quote",
          text: "发现 — 如何从一个尚不成熟的产品想法出发，发现真实需求可能发生在哪里？",
        },
        {
          type: "quote",
          text: "学习 — 如何让每一次 Reddit 运营，都成为下一次增长决策可以复用的证据？",
        },
      ],
    },
    {
      id: "competitive-analysis",
      level: 1,
      number: "3.",
      title: "竞品分析",
      blocks: [
        {
          type: "paragraph",
          text: "我把主流 Reddit 获客/监听工具按“匹配逻辑”进行了分析和匹配。",
        },
        {
          type: "table",
          headers: [
            "产品名称",
            "现有方法",
            "从什么开始",
            "适合",
            "对 0→1 的限制",
          ],
          rows: [
            [
              "F5Bot",
              "关键词监听",
              "已知关键词",
              "品牌监听 / SEO",
              "必须已经知道搜什么",
            ],
            [
              "Syften",
              "社区研究",
              "已知子版块",
              "用户研究",
              "必须已经知道用户在哪",
            ],
            [
              "ReplyGuy / Devi AI",
              "AI 外联",
              "品牌 + 关键词",
              "规模化互动",
              "容易产生低相关回复与平台风险",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "这些产品各有特点，但现实的问题是 Reddit 不缺少搜索工具，而是现有的工具都是从“已知答案”开始。它们要求运营者先知道关键词、竞品或目标社区，再帮助扩大搜索。但我自己的增长实践恰恰发生在这些答案还不存在的时候。因此，我没有继续优化“如何搜得更多”，而是重新设计了搜索之前发生的那一步。",
        },
      ],
    },
    {
      id: "core-insight",
      level: 1,
      number: "4.",
      title: "核心洞察：不要从产品开始，从“用户正在经历的瞬间”开始",
      blocks: [
        {
          type: "paragraph",
          text: "对于成熟产品，我们可以从品类、竞品和关键词开始寻找用户。但 0→1 产品的开发者往往连“我的核心用户是谁”“产品最大的卖点是什么”都还没有答案。相比抽象的产品定义，一个具体的使用场景反而更容易描述。此外我发现，真实用户很少按照产品团队定义的品类来描述自己的问题，他们描述的是自己正在经历的情境。例如，一个 AI 陪伴产品如果从产品类别出发：",
        },
        {
          type: "quote",
          text: "AI Companion → AI → Chatbot → AI Tools → AI Girlfriend",
        },
        {
          type: "paragraph",
          text: "最终很容易进入大量看似相关、实际需求并不强的技术社区。但真实的潜在用户可能正在另一个完全不同的地方说：“一个人打游戏越来越没意思了。” 他没有搜索 “AI companion”，甚至可能从未想过自己需要一个 AI 产品。但他已经表达了产品所解决的需求。",
        },
        {
          type: "paragraph",
          text: "所以我把原来的搜索逻辑：",
        },
        {
          type: "quote",
          text: "Product → Category → Keywords → Communities",
        },
        {
          type: "paragraph",
          text: "重新定义为：",
        },
        {
          type: "quote",
          text: "Product → User Situation → Need Expression → Reddit Evidence",
        },
      ],
    },
    {
      id: "method-seed-to-tree",
      level: 1,
      number: "5.",
      title: "方法｜从种子到树",
      blocks: [
        {
          type: "paragraph",
          text: "我把“从一个模糊想法，逐层展开成真实需求证据”这套方法称为「从种子到树」。系统不要求用户先定义完整的目标用户、产品类别或核心卖点。一个具体的使用场景就可以成为搜索的种子。",
        },
        {
          type: "paragraph",
          text: "举个例子：",
        },
        {
          type: "heading",
          text: "种子 — 体验瞬间",
        },
        {
          type: "paragraph",
          text: "“周六早上，22 岁的 Mary 坐在沙发上打开这个游戏。她想放松一下，安静地消磨周末时间。”",
        },
        {
          type: "paragraph",
          text: "→ ① 体验信号",
        },
        {
          type: "paragraph",
          text: "AI 首先从场景中识别可能影响需求的信号：",
        },
        {
          type: "numbered",
          items: [
            {
              title: "情境",
              body: "周末 / 早晨 / 在家",
            },
            {
              title: "情绪",
              body: "放松 / cozy / 无压力",
            },
            {
              title: "动机",
              body: "消磨时间 / escape / recharge",
            },
            {
              title: "行为",
              body: "casual gaming / scrolling / solo activity",
            },
          ],
        },
        {
          type: "paragraph",
          text: "→ ② 需求表达",
        },
        {
          type: "paragraph",
          text: "然后不再围绕产品名称扩展，而是推测这些人在 Reddit 上可能如何表达自己的状态：",
        },
        {
          type: "bullets",
          items: [
            "“looking for something relaxing to play”",
            "“games I can play while lying on the couch”",
            "“what do you guys do on a lazy weekend?”",
            "“cozy games that don't require much thinking”",
          ],
        },
        {
          type: "paragraph",
          text: "→ ③ Reddit 原生查询",
        },
        {
          type: "paragraph",
          text: "系统把这些表达组合、扩展成不同搜索方向。",
        },
        {
          type: "paragraph",
          text: "→ ④ 真实 Reddit 证据",
        },
        {
          type: "paragraph",
          text: "跨 subreddit 搜索真实讨论。",
        },
        {
          type: "paragraph",
          text: "→ ⑤ 机会地图",
        },
        {
          type: "paragraph",
          text: "最后才从真实帖子反向回答：",
        },
        {
          type: "numbered",
          items: [
            {
              title: "谁",
              body: "哪些人正在表达类似需求？",
            },
            {
              title: "哪里",
              body: "这些讨论发生在哪些社区？",
            },
            {
              title: "为什么",
              body: "哪种需求与产品体验最相关？",
            },
            {
              title: "如何",
              body: "应该评论、发帖，还是继续观察？",
            },
          ],
        },
        {
          type: "seedTree",
          caption: "[从种子到树]",
          root: "用户瞬间",
          midLeft: "需求表达",
          midCenter: "情绪信号",
          midRight: "行为信号",
          queriesLabel: "查询",
          top: "真实 Reddit 帖子",
        },
      ],
    },
    {
      id: "workflow-ai-enhanced",
      level: 1,
      number: "6.",
      title: "工作流｜把方法变成 AI 增强工作流",
      blocks: [
        {
          type: "paragraph",
          text: "过去，这些判断主要存在于我的个人经验里：理解产品、想象用户场景、不断尝试搜索词、浏览大量帖子，再凭经验判断哪些帖子值得参与。我把这个过程拆解成了一条 AI 与真实数据协作的工作流：",
        },
        {
          type: "workflowStrip",
          caption: "[AI 增强工作流]",
          steps: [
            {
              title: "理解",
              body: "AI 通过追问，把一句模糊的产品描述补全为可研究的产品语境。",
            },
            {
              title: "扩展",
              body: "从产品功能向外派生用户情境、情绪状态和自然需求表达。",
            },
            {
              title: "检索",
              body: "将这些表达转化为 Reddit 原生查询，并跨社区检索真实帖子。",
            },
            {
              title: "排序",
              body: "根据相关性、需求强度、时效性与互动活跃度对证据帖子排序。",
            },
            {
              title: "行动",
              body: "结合帖子内容和社区语境，生成回复角度、内容结构或草稿。",
            },
            {
              title: "学习",
              body: "记录发布表现、社区表现和互动用户，让真实结果反过来影响下一轮增长判断。",
            },
          ],
        },
      ],
    },
    {
      id: "product-architecture",
      level: 1,
      number: "7.",
      title: "产品架构",
      blocks: [
        {
          type: "paragraph",
          text: "整个产品最终形成两个相互连接的工作闭环：机会发现负责从模糊的使用情境中发现潜在需求，增长学习则负责记录真实运营结果，并把这些结果沉淀为下一轮增长判断的依据。",
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-architecture.jpg",
          alt: "Reddit Growth OS 产品架构：机会发现与增长学习双闭环",
          caption: "[产品架构]",
          width: 1024,
          height: 512,
        },
      ],
    },
    {
      id: "opportunity-discovery",
      level: 2,
      number: "7.1",
      title: "机会发现 — 找到需求正在发生的地方",
      blocks: [
        {
          type: "paragraph",
          text: "第一个闭环解决的是：我的潜在用户可能在哪里，以及我应该如何接近他们？前文已经对方法进行了叙述，在实际编写过程中把增长研究拆成三个相互约束的阶段：规划 → 检索 → 评估。",
        },
        {
          type: "heading",
          text: "01｜规划 — 把模糊描述转化为搜索假设",
        },
        {
          type: "paragraph",
          text: "用户提供产品描述后，系统首先调用 AI 生成一个查询计划，将输入整理为产品概要、潜在目标用户、需求表达、竞品假设，并允许 AI 进行有限的语义联想，再筛选出在 Reddit 上用于搜索验证的搜索查询。为了避免语义扩展无限发散，候选方向需要同时满足两个条件：保留原始场景中的核心需求，并对应真实用户可能自然表达的具体情境。过于宽泛、已经改变原始需求性质，或只描述产品类别的方向会被过滤。",
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-product-brief.png",
          alt: "Product Brief 输入界面：产品描述与生成调研计划",
          caption: "[产品概要输入]",
          width: 1024,
          height: 705,
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-research-plan.jpg",
          alt: "Research Plan 界面：目标用户、痛点、搜索查询与竞品假设",
          caption: "[调研计划]",
          width: 643,
          height: 1024,
          layout: "medium",
        },
        {
          type: "heading",
          text: "02｜检索 — 让真实 Reddit 内容验证搜索假设",
        },
        {
          type: "paragraph",
          text: "查询计划生成后，系统首先对筛选后的搜索查询做查询扇出：最多并行执行 8 个不同搜索方向，每个查询获取一组候选帖子。这里刻意保留多个语义相邻但表达不同的查询，因为同一个需求在 Reddit 上可能以完全不同的语言出现。",
        },
        {
          type: "paragraph",
          text: "检索结果随后经过三层收敛：",
        },
        {
          type: "numbered",
          items: [
            {
              title: "帖子去重",
              body: "不同查询可能命中同一条帖子。系统以帖子为单位去重，避免重复内容放大某一方向的权重。",
            },
            {
              title: "查询命中聚合",
              body: "如果同一帖子被多个查询命中，系统不会简单删除重复结果，而是将这些搜索路径合并为匹配查询。多路径命中可以作为一个弱相关性信号增加权重。",
            },
            {
              title: "证据池构建",
              body: "系统结合查询命中情况、发布时间和互动数据，对候选结果进行初步排序，并控制最终证据池的规模，再交给后续 AI 分析。",
            },
          ],
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-reddit-evidence.png",
          alt: "Reddit Evidence 界面：证据池中的 Reddit 帖子列表",
          caption: "[Reddit 证据池]",
          width: 1024,
          height: 832,
        },
        {
          type: "heading",
          text: "03｜评估 — 基于证据判断机会",
        },
        {
          type: "paragraph",
          text: "最后对证据池做基于证据的机会分析。每个候选机会主要从四个层面判断：",
        },
        {
          type: "numbered",
          items: [
            {
              title: "需求相关性",
              body: "帖子表达的问题、目标或情绪，是否真正对应产品能够提供的体验。",
            },
            {
              title: "需求强度",
              body: "区分泛泛讨论与更强的需求信号，例如主动抱怨现状、寻找推荐、比较替代方案、询问解决办法，或表现出购买／尝试意图。",
            },
            {
              title: "社区适配度",
              body: "不仅判断帖子本身是否相关，还要判断这一需求是否与子版块的讨论语境一致。单条偶然出现的相关帖子，不应自动被解释为整个社区都是潜在获客渠道。",
            },
            {
              title: "行动价值",
              body: "结合发布时间、评论活跃度和讨论状态判断机会是否仍然值得介入。高度相关但已经沉寂很久的帖子，与正在形成讨论的新帖子具有不同的行动优先级。",
            },
          ],
        },
        {
          type: "paragraph",
          text: "模型综合四个维度生成匹配分数，并按照机会优先级形成排序列表，帮助用户快速判断哪些帖子最值得进一步参与。每个机会保留对应的原始帖子、评分依据和推荐理由，并结合具体讨论语境生成针对性的回复话术。",
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-opportunity-map.jpg",
          alt: "Opportunity Map 界面：机会卡片、匹配分数与证据帖子",
          caption: "[机会地图]",
          width: 1024,
          height: 948,
        },
      ],
    },
    {
      id: "growth-learning",
      level: 2,
      number: "7.2",
      title: "增长学习 — 让每一次运营成为下一次判断的依据",
      blocks: [
        {
          type: "paragraph",
          text: "第二个闭环解决的是：做完之后，我怎么知道什么真的有效，以及谁真正对产品产生了兴趣？",
        },
        {
          type: "paragraph",
          text: "相比只记录浏览量、点赞或评论这些从 Reddit 平台直观看到的数据，我希望系统进一步理解这些互动背后的用户态度和需求信号。因此，增长学习被拆成三个层次：",
        },
        {
          type: "heading",
          text: "01｜表现 — 哪些内容真正有效？",
        },
        {
          type: "paragraph",
          text: "系统持续同步账号发布的帖子及互动数据，并通过仪表盘将分散在不同子版块中的运营结果统一起来。除了浏览量、点赞、评论等基础指标，系统进一步综合帖子的互动热度和回复表现，让用户快速识别高表现内容，并横向比较：",
        },
        {
          type: "bullets",
          items: [
            "哪些帖子获得了更高关注？",
            "哪些社区产生了更多有效互动？",
            "哪些内容角度更容易引发讨论？",
          ],
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-dashboard.png",
          alt: "Reddit Growth OS 仪表盘：帖子表现与社区分布",
          caption: "[增长仪表盘]",
          width: 1024,
          height: 529,
        },
        {
          type: "heading",
          text: "02｜评论洞察 — 从“有多少回复”到“谁在回复”",
        },
        {
          type: "paragraph",
          text: "高互动并不一定意味着高质量增长。因此，在帖子表现之外，系统进一步通过 AI 对评论区进行语义分析，从两个维度理解真实反馈：",
        },
        {
          type: "numbered",
          items: [
            {
              title: "情绪｜用户怎么看？",
              body: "识别评论中的正向、负向和中性态度，观察社区对帖子和产品概念的整体接受程度。",
            },
            {
              title: "潜在匹配｜这个人是不是潜在用户？",
              body: "相比单纯判断情绪，系统进一步分析评论中表达的需求、使用场景、兴趣和尝试意愿，判断互动者是否与产品可能服务的用户相匹配。",
            },
          ],
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-comment-intelligence.png",
          alt: "Comment Intelligence：评论情绪分布与高分评论",
          caption: "[评论洞察]",
          width: 1024,
          height: 535,
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-audience-intelligence.png",
          alt: "Audience：从评论中识别高意图与潜在用户",
          caption: "[受众识别]",
          width: 1024,
          height: 274,
        },
        {
          type: "heading",
          text: "03｜受众发现 — 从高意图评论者反向扩展用户画像",
        },
        {
          type: "paragraph",
          text: "当系统识别出潜在的高意图用户后，这些用户会进入受众池。",
        },
        {
          type: "paragraph",
          text: "在用户公开信息允许的范围内，系统可以进一步读取其 Reddit 主页中的公开活动，分析其经常参与的社区、讨论主题和内容方向，并逐渐形成更具体的受众信号。",
        },
        {
          type: "paragraph",
          text: "这些信息有两个用途：",
        },
        {
          type: "bullets",
          items: [
            "帮助团队从真实用户行为中修正最初的用户假设——真正对产品产生兴趣的人是谁，他们还关心什么？",
            "高意图用户反复出现的兴趣主题和社区可以进入下一轮增长研究，成为新的搜索方向和内容素材。",
          ],
        },
        {
          type: "paragraph",
          text: "因此，增长学习本身形成了一个小的反馈闭环：",
        },
        {
          type: "quote",
          plain: true,
          text: "帖子表现 → 评论分析 → 潜在用户 → 主页信号 → 受众池 → 新社区／主题",
        },
        {
          type: "paragraph",
          text: "系统不再只根据团队预设的用户画像寻找用户，而是开始从真实产生互动的人身上反向学习用户画像。随着运营数据逐渐积累，系统还可以进一步生成日报／周报，将内容表现、社区反馈、受众信号和新的增长机会自动整理为周期性复盘。",
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-engager-intelligence.png",
          alt: "Engager Intelligence：高意图互动者与新发现社区",
          caption: "[受众发现]",
          width: 1024,
          height: 525,
        },
      ],
    },
    {
      id: "closing-the-loop",
      level: 2,
      number: "7.3",
      title: "闭合闭环 — 从发现机会到积累增长认知",
      blocks: [
        {
          type: "paragraph",
          text: "两个工作流最终形成一条持续迭代的增长闭环：",
        },
        {
          type: "quote",
          plain: true,
          spaced: true,
          text: "假设 → 研究 → 证据 → 行动 → 反馈 → 受众学习 → 更好的假设",
        },
        {
          type: "paragraph",
          text: "机会发现从使用场景和需求假设出发，寻找可能的用户与社区；增长学习则从真实发布后的互动数据出发，识别真正产生兴趣的人，并从他们的公开行为中发现新的用户特征、社区和内容方向，从而更精准地找到用户、实现增长目标。",
        },
        {
          type: "paragraph",
          text: "项目链接：https://github.com/xiangc-rvz/rdit_tracking",
        },
      ],
    },
  ],
};

const redditGrowthOsEn: ProjectCopy = {
  title: "Reddit Growth OS",
  description:
    "Turn demand expressions on Reddit into executable acquisition actions",
  tags: ["Product Design", "AI Workflow Design", "Prototyping"],
  sections: [
    {
      id: "product-definition",
      level: 1,
      number: "1.",
      title: "Product Definition",
      blocks: [
        {
          type: "paragraph",
          text: "Reddit Growth OS is an AI growth research tool grounded in real Reddit content evidence. I abstracted my own Reddit cold-start working method into an AI-enhanced workflow that helps early-stage products start from a fuzzy product idea, discover scenes where potential users are already expressing demand, and turn those signals into executable, reviewable growth actions.",
        },
        {
          type: "heading",
          text: "Product Demo",
        },
        {
          type: "image",
          src: "/videos/reddit-growth-os-demo.mp4",
          alt: "Reddit Growth OS product demo video",
          width: 1806,
          height: 1080,
          controls: true,
          loop: false,
        },
      ],
    },
    {
      id: "project-background",
      level: 1,
      number: "2.",
      title: "Project Background: It started from a real Reddit growth practice",
      blocks: [
        {
          type: "paragraph",
          text: "While doing Reddit growth at a U.S. AI startup, I once brought in 200+ users and 30K+ organic traffic in a week through operations. What I realized was that the time I spent most was not writing posts — it was constantly judging: where should I go to find people who might actually need this product? And after doing the work, how do I know what truly worked? Reddit growth logic is very different from traditional channels. Users are scattered across highly autonomous communities, and each subreddit has its own language, rules, and tolerance for promotional content. For 0→1 products whose user portraits are still unstable, two problems keep recurring.",
        },
        {
          type: "numbered",
          items: [
            {
              title:
                "Finding a “relevant community” is not the same as finding people with demand",
              body: "Early products rarely have a clear user portrait. Teams often search communities from product category first, and end up in subreddits that look relevant but convert poorly.",
            },
            {
              title: "Growth actions cannot compound",
              body: "Which community, what angle, what content, and what results — these usually live in spreadsheets and personal memory. It becomes hard to review what actually worked.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "So I split the problem into two loops.",
        },
        {
          type: "quote",
          text: "Discovery — Starting from an immature product idea, how do you find where real demand might be happening?",
        },
        {
          type: "quote",
          text: "Learning — How do you turn every Reddit operation into evidence the next growth decision can reuse?",
        },
      ],
    },
    {
      id: "competitive-analysis",
      level: 1,
      number: "3.",
      title: "Competitive Analysis",
      blocks: [
        {
          type: "paragraph",
          text: "I analyzed mainstream Reddit acquisition / listening tools by their matching logic.",
        },
        {
          type: "table",
          headers: [
            "Product",
            "Existing method",
            "Starts from",
            "Best for",
            "Limit for 0→1",
          ],
          rows: [
            [
              "F5Bot",
              "Keyword Monitoring",
              "Known keywords",
              "Brand listening / SEO",
              "You must already know what to search",
            ],
            [
              "Syften",
              "Community Research",
              "Known subreddits",
              "User research",
              "You must already know where users are",
            ],
            [
              "ReplyGuy / Devi AI",
              "AI Outreach",
              "Brand + keywords",
              "Scaled engagement",
              "Easy to create low-relevance replies and platform risk",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Each of these products has its strengths. The real issue is not that Reddit lacks search tools — it is that existing tools all start from known answers. They ask operators to already know keywords, competitors, or target communities, then help expand the search. My own growth practice happened precisely when those answers did not yet exist. So instead of optimizing “how to search more,” I redesigned the step that happens before search.",
        },
      ],
    },
    {
      id: "core-insight",
      level: 1,
      number: "4.",
      title:
        "Core Insight: Don't start with the product. Start with the moment.",
      blocks: [
        {
          type: "paragraph",
          text: "For mature products, we can start from categories, competitors, and keywords to find users. But 0→1 builders often still don't have answers to “who is my core user” or “what is the biggest selling point.” Compared with an abstract product definition, a concrete use situation is often easier to describe. I also found that real users rarely describe their problems in the categories product teams invent — they describe the situation they are living through. For example, if an AI companion product starts from product category:",
        },
        {
          type: "quote",
          text: "AI Companion → AI → Chatbot → AI Tools → AI Girlfriend",
        },
        {
          type: "paragraph",
          text: "It can easily land in many technical communities that look related but have weak real demand. Meanwhile, a real potential user may be somewhere completely different saying: “Playing games alone is getting less and less fun.” They never searched “AI companion,” and may never have thought they needed an AI product. But they have already expressed the need the product solves.",
        },
        {
          type: "paragraph",
          text: "So I redefined the old search logic:",
        },
        {
          type: "quote",
          text: "Product → Category → Keywords → Communities",
        },
        {
          type: "paragraph",
          text: "as:",
        },
        {
          type: "quote",
          text: "Product → User Situation → Need Expression → Reddit Evidence",
        },
      ],
    },
    {
      id: "method-seed-to-tree",
      level: 1,
      number: "5.",
      title: "Method｜Seed-to-Tree",
      blocks: [
        {
          type: "paragraph",
          text: "I call this method of expanding a fuzzy idea layer by layer into real demand evidence Seed-to-Tree. The system does not require users to first define a complete target user, product category, or core selling point. One concrete use situation can become the seed of search.",
        },
        {
          type: "paragraph",
          text: "For example:",
        },
        {
          type: "heading",
          text: "Seed — Experience Moment",
        },
        {
          type: "paragraph",
          text: "“On Saturday morning, 22-year-old Mary sits on the sofa and opens this game. She wants to relax and quietly pass the weekend.”",
        },
        {
          type: "paragraph",
          text: "→ ① Experience Signals",
        },
        {
          type: "paragraph",
          text: "AI first identifies signals from the scene that may shape demand:",
        },
        {
          type: "numbered",
          items: [
            {
              title: "Context",
              body: "Weekend / morning / at home",
            },
            {
              title: "Emotion",
              body: "Relaxation / cozy / low pressure",
            },
            {
              title: "Motivation",
              body: "Passing time / escape / recharge",
            },
            {
              title: "Behavior",
              body: "Casual gaming / scrolling / solo activity",
            },
          ],
        },
        {
          type: "paragraph",
          text: "→ ② Need Expressions",
        },
        {
          type: "paragraph",
          text: "Then, instead of expanding around the product name, it infers how these people might express their state on Reddit:",
        },
        {
          type: "bullets",
          items: [
            "“looking for something relaxing to play”",
            "“games I can play while lying on the couch”",
            "“what do you guys do on a lazy weekend?”",
            "“cozy games that don't require much thinking”",
          ],
        },
        {
          type: "paragraph",
          text: "→ ③ Reddit-native Queries",
        },
        {
          type: "paragraph",
          text: "The system combines and expands these expressions into different search directions.",
        },
        {
          type: "paragraph",
          text: "→ ④ Real Reddit Evidence",
        },
        {
          type: "paragraph",
          text: "Search real discussions across subreddits.",
        },
        {
          type: "paragraph",
          text: "→ ⑤ Opportunity Map",
        },
        {
          type: "paragraph",
          text: "Only then do we reverse from real posts to answer:",
        },
        {
          type: "numbered",
          items: [
            {
              title: "Who",
              body: "Who is expressing similar needs?",
            },
            {
              title: "Where",
              body: "Which communities host these discussions?",
            },
            {
              title: "Why",
              body: "Which needs relate most to the product experience?",
            },
            {
              title: "How",
              body: "Should we comment, post, or keep observing?",
            },
          ],
        },
        {
          type: "seedTree",
          caption: "[Seed-to-Tree]",
          root: "User Moment",
          midLeft: "Need Expressions",
          midCenter: "Emotion Signals",
          midRight: "Behavior Signals",
          queriesLabel: "Queries",
          top: "Real Reddit Posts",
        },
      ],
    },
    {
      id: "workflow-ai-enhanced",
      level: 1,
      number: "6.",
      title: "Workflow｜Turning the Method into an AI-enhanced Workflow",
      blocks: [
        {
          type: "paragraph",
          text: "In the past, these judgments lived mostly in my personal experience: understanding the product, imagining user situations, trying search queries, browsing countless posts, then deciding which ones were worth engaging with. I broke that process into an AI + real-data workflow:",
        },
        {
          type: "workflowStrip",
          caption: "[AI-enhanced workflow]",
          steps: [
            {
              title: "Understand",
              body: "Through follow-up questions, AI turns a vague product description into researchable product context.",
            },
            {
              title: "Expand",
              body: "From product features outward, derive user situations, emotional states, and natural need expressions.",
            },
            {
              title: "Retrieve",
              body: "Translate those expressions into Reddit-native queries and retrieve real posts across communities.",
            },
            {
              title: "Rank",
              body: "Rank evidence posts by relevance, demand intensity, recency, and engagement activity.",
            },
            {
              title: "Act",
              body: "Using post content and community context, generate reply angles, content structure, or a draft.",
            },
            {
              title: "Learn",
              body: "Log publish performance, community response, and engaged users so real results reshape the next round of growth judgment.",
            },
          ],
        },
      ],
    },
    {
      id: "product-architecture",
      level: 1,
      number: "7.",
      title: "Product Architecture",
      blocks: [
        {
          type: "paragraph",
          text: "The product ultimately forms two interconnected working loops: Opportunity Discovery finds potential demand from fuzzy usage situations, while Growth Learning records real operating results and turns them into evidence for the next round of growth judgment.",
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-architecture.jpg",
          alt: "Reddit Growth OS product architecture: Growth Research and Growth Learning loops",
          caption: "[Product Architecture]",
          width: 1024,
          height: 512,
        },
      ],
    },
    {
      id: "opportunity-discovery",
      level: 2,
      number: "7.1",
      title: "Opportunity Discovery — Finding where demand is already happening",
      blocks: [
        {
          type: "paragraph",
          text: "The first loop answers: where might my potential users be, and how should I approach them? The method was described earlier; in implementation, Growth Research is split into three mutually constrained stages: Plan → Retrieve → Evaluate.",
        },
        {
          type: "heading",
          text: "01｜Plan — Turn a fuzzy description into search hypotheses",
        },
        {
          type: "paragraph",
          text: "After the user provides a product description, the system first calls AI to generate a Query Plan. It organizes the input into a product summary, potential target users, need expressions, and competitor hypotheses, allows limited semantic association, and then filters searchQueries for Reddit validation. To keep semantic expansion from drifting endlessly, candidate directions must satisfy two conditions at once: preserve the core need from the original scene, and map to concrete situations real users might naturally express. Directions that are too broad, that change the nature of the original need, or that only describe a product category are filtered out.",
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-product-brief.png",
          alt: "Product Brief input: product description and build research plan",
          caption: "[Product Brief input]",
          width: 1024,
          height: 705,
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-research-plan.jpg",
          alt: "Research Plan: target users, pain points, search queries, and competitor hypotheses",
          caption: "[Research Plan]",
          width: 643,
          height: 1024,
          layout: "medium",
        },
        {
          type: "heading",
          text: "02｜Retrieve — Let real Reddit content validate the search hypotheses",
        },
        {
          type: "paragraph",
          text: "Once the Query Plan is ready, the system runs query fan-out on the filtered searchQueries: up to 8 different search directions in parallel, each returning a set of candidate posts. Multiple semantically adjacent but differently worded queries are kept on purpose, because the same need can appear on Reddit in completely different language.",
        },
        {
          type: "paragraph",
          text: "Retrieval results then go through three layers of convergence:",
        },
        {
          type: "numbered",
          items: [
            {
              title: "Post Deduplication",
              body: "Different queries may hit the same post. The system deduplicates by post so repeated content does not inflate any one direction’s weight.",
            },
            {
              title: "Query-hit Aggregation",
              body: "If the same post is hit by multiple queries, duplicates are not simply deleted. Those search paths are merged into matchedQueries. Multi-path hits can act as a weak relevance signal and raise weight.",
            },
            {
              title: "Evidence Pool Construction",
              body: "Combining query hits, publish time, and engagement data, the system does an initial ranking, controls the size of the final evidence pool, and then hands it to later AI analysis.",
            },
          ],
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-reddit-evidence.png",
          alt: "Reddit Evidence: evidence pool of Reddit posts",
          caption: "[Reddit Evidence]",
          width: 1024,
          height: 832,
        },
        {
          type: "heading",
          text: "03｜Evaluate — Judge opportunities from evidence",
        },
        {
          type: "paragraph",
          text: "Finally, the Evidence Pool goes through evidence-grounded opportunity analysis. Each candidate opportunity is judged mainly on four dimensions:",
        },
        {
          type: "numbered",
          items: [
            {
              title: "Need Relevance",
              body: "Whether the problem, goal, or emotion expressed in the post truly maps to the experience the product can provide.",
            },
            {
              title: "Intent Strength",
              body: "Separating casual discussion from stronger demand signals — actively complaining about the status quo, asking for recommendations, comparing alternatives, seeking solutions, or showing purchase / trial intent.",
            },
            {
              title: "Community Fit",
              body: "Judging not only whether the post itself is relevant, but whether the need fits the subreddit’s discussion context. A single coincidental related post should not automatically mean the whole community is an acquisition channel.",
            },
            {
              title: "Opportunity Timing",
              body: "Using publish time, comment activity, and discussion state to judge whether the opportunity is still worth entering. A highly relevant but long-dormant post has a different action priority from a new post whose discussion is still forming.",
            },
          ],
        },
        {
          type: "paragraph",
          text: "The model combines the four dimensions into a fitScore and produces a priority-ranked list so users can quickly see which posts are most worth engaging. Each opportunity keeps the original post, scoring rationale, and recommendation reason, and generates targeted reply language grounded in the specific discussion context.",
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-opportunity-map.jpg",
          alt: "Opportunity Map: opportunity card, fit score, and evidence posts",
          caption: "[Opportunity Map]",
          width: 1024,
          height: 948,
        },
      ],
    },
    {
      id: "growth-learning",
      level: 2,
      number: "7.2",
      title: "Growth Learning — Make every operation fuel the next judgment",
      blocks: [
        {
          type: "paragraph",
          text: "The second loop answers: after acting, how do I know what actually worked — and who truly became interested in the product?",
        },
        {
          type: "paragraph",
          text: "Rather than only logging views, upvotes, or comments visible on Reddit, I want the system to understand the attitudes and demand signals behind those interactions. Growth Learning is therefore split into three layers:",
        },
        {
          type: "heading",
          text: "01｜Performance — Which content actually works?",
        },
        {
          type: "paragraph",
          text: "The system continuously syncs the account’s published posts and engagement data, and uses a Dashboard to unify results scattered across subreddits. Beyond basic metrics like views, upvotes, and comments, it also combines interaction heat and reply performance so users can quickly spot high-performing content and compare across dimensions:",
        },
        {
          type: "bullets",
          items: [
            "Which posts earned more attention?",
            "Which communities produced more effective interactions?",
            "Which content angles more easily spark discussion?",
          ],
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-dashboard.png",
          alt: "Reddit Growth OS dashboard: post performance and community distribution",
          caption: "[Growth Dashboard]",
          width: 1024,
          height: 529,
        },
        {
          type: "heading",
          text: "02｜Comment Intelligence — From “how many replies” to “who is replying”",
        },
        {
          type: "paragraph",
          text: "High engagement does not automatically mean high-quality growth. Beyond post performance, the system uses AI to analyze comment threads semantically along two dimensions:",
        },
        {
          type: "numbered",
          items: [
            {
              title: "Sentiment — How do people feel?",
              body: "Identify positive, negative, and neutral attitudes in comments, and observe the community’s overall acceptance of the post and product concept.",
            },
            {
              title: "Potential Fit — Is this person a potential user?",
              body: "Beyond sentiment alone, analyze needs, usage scenes, interests, and willingness to try expressed in comments, and judge whether the commenter matches users the product may serve.",
            },
          ],
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-comment-intelligence.png",
          alt: "Comment Intelligence: sentiment breakdown and top comments",
          caption: "[Comment Intelligence]",
          width: 1024,
          height: 535,
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-audience-intelligence.png",
          alt: "Audience: identify strong-interest and potential commenters",
          caption: "[Audience Identification]",
          width: 1024,
          height: 274,
        },
        {
          type: "heading",
          text: "03｜Audience Discovery — Expand portraits from high-intent commenters",
        },
        {
          type: "paragraph",
          text: "Once potential high-intent users are identified, they enter the Audience Pool.",
        },
        {
          type: "paragraph",
          text: "Within what public information allows, the system can further read public activity on a Reddit profile, analyze communities they often join, topics they discuss, and content directions they follow, and gradually form more concrete audience signals.",
        },
        {
          type: "paragraph",
          text: "These signals serve two purposes:",
        },
        {
          type: "bullets",
          items: [
            "Help the team revise initial user hypotheses from real behavior — who actually became interested, and what else do they care about?",
            "Interest themes and communities that recur among high-intent users can enter the next Growth Research cycle as new search directions and content material.",
          ],
        },
        {
          type: "paragraph",
          text: "Growth Learning therefore forms a smaller feedback loop of its own:",
        },
        {
          type: "quote",
          plain: true,
          text: "Post Performance → Comment Analysis → Potential Users → Profile Signals → Audience Pool → New Communities / Topics",
        },
        {
          type: "paragraph",
          text: "The system no longer searches only from a team-defined persona. It starts learning user portraits in reverse from people who actually interacted. As operating data accumulates, it can also generate daily / weekly reports that automatically organize content performance, community feedback, Audience Signals, and new growth opportunities into periodic reviews.",
        },
        {
          type: "image",
          src: "/images/reddit-growth-os-engager-intelligence.png",
          alt: "Engager Intelligence: high-intent engagers and newly discovered communities",
          caption: "[Audience Discovery]",
          width: 1024,
          height: 525,
        },
      ],
    },
    {
      id: "closing-the-loop",
      level: 2,
      number: "7.3",
      title: "Closing the Loop — From finding opportunities to accumulating growth knowledge",
      blocks: [
        {
          type: "paragraph",
          text: "The two workflows finally form one continuously iterating growth loop:",
        },
        {
          type: "quote",
          plain: true,
          spaced: true,
          text: "Hypothesis → Research → Evidence → Action → Response → Audience Learning → Better Hypothesis",
        },
        {
          type: "paragraph",
          text: "Opportunity Discovery starts from usage scenes and demand hypotheses to find possible users and communities. Growth Learning starts from post-publish interaction data to identify people who truly became interested, and from their public behavior discovers new user traits, communities, and content directions — so the next round can find users more precisely and hit growth goals.",
        },
        {
          type: "paragraph",
          text: "Project link: https://github.com/xiangc-rvz/rdit_tracking",
        },
      ],
    },
  ],
};

const fourthTrimesterHealthCn: ProjectCopy = {
  title: "Fourth Trimester Health",
  description: "为产后阶段开发可穿戴与环境传感系统。",
  tags: ["AI 产品", "用户研究", "服务设计"],
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
        {
          type: "image",
          src: "/images/fourth-trimester-health-ai-architecture.png",
          alt: "Fourth Trimester Health 系统架构：穿戴设备、云端与智能模型闭环",
          caption: "[自我进化的监测架构]",
          width: 1024,
          height: 538,
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
        {
          type: "paragraph",
          text: "点击[这里](https://drive.google.com/file/d/1HCmKb6094ez2zuvMRHWf9DuFgXSA0Izm/view?usp=sharing)观看我们的最终汇报。",
        },
      ],
    },
  ],
};

const fourthTrimesterHealthEn: ProjectCopy = {
  title: "Fourth Trimester Health",
  description:
    "Developing a wearable and environmental sensor system for the postpartum period.",
  tags: ["AI Product", "User Research", "Service Design"],
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
        {
          type: "image",
          src: "/images/fourth-trimester-health-ai-architecture.png",
          alt: "Fourth Trimester Health architecture: wearables, cloud, and intelligence loop",
          caption: "[Self-evolving monitoring architecture]",
          width: 1024,
          height: 538,
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
        {
          type: "paragraph",
          text: "Click [here](https://drive.google.com/file/d/1HCmKb6094ez2zuvMRHWf9DuFgXSA0Izm/view?usp=sharing) to watch our final presentation.",
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
      tags: ["XR", "Interaction Design", "Rapid Prototyping"],
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
      tags: ["XR", "交互设计", "快速原型"],
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
    slug: "artiverse",
    image: "/images/artiverse-cover.png",
    imageAlt:
      "Artiverse cover — diverse creators looking up at linked landscape and painting windows on a pink ground",
    showInHomeGrid: false,
    en: {
      title: "Artiverse",
      description: "A Location-Based Creative Community",
      tags: ["UX Design", "Design Hackathon"],
      timeline: ["CMU · UXA Hackathon · 8 hours"],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: 'Artiverse was created during an 8-hour UX Design Hackathon at CMU themed “Bringing People Closer.” Focused on how digital products can foster more meaningful human connection, we turned to photographers and painters — two communities with different creative mediums who nonetheless share visual inspiration and creative contexts.',
            },
            {
              type: "paragraph",
              text: "Based on their shared needs around location discovery, sourcing creative references, and exchanging work, we designed Artiverse — a cross-medium art community centered on geographic place. Users can discover real locations and their associated photography and painting through a map, and build connections through work citation, creative linking, and notification feedback — turning a simple spark of inspiration into ongoing creative interaction.",
            },
            {
              type: "image",
              src: "/videos/artiverse-demo.mp4",
              alt: "Artiverse demo video",
              width: 1908,
              height: 1080,
              controls: true,
              loop: false,
            },
          ],
        },
        {
          id: "design-challenge",
          level: 1,
          number: "2.",
          title: "Design Challenge",
          blocks: [
            {
              type: "quote",
              text: "How Might We Connect Different Creative Communities Through Shared Locations?",
            },
            {
              type: "image",
              src: "/images/artiverse-target-landscape-artist.png",
              alt: "Target audience — Landscape Artist persona: Risa, workflow, challenges, and reference visuals",
              width: 1024,
              height: 551,
            },
            {
              type: "image",
              src: "/images/artiverse-target-photographer.png",
              alt: "Target audience — Photographer persona: Bryan, workflow, challenges, and location photography",
              width: 1024,
              height: 550,
            },
            {
              type: "image",
              src: "/images/artiverse-overlapping-pain-points.png",
              alt: "The situation — overlapping pain points across creative cross-pollination, discovery, community feedback, and attribution",
              width: 1024,
              height: 549,
            },
            {
              type: "paragraph",
              spacedTop: true,
              text: "Photographers and painters use different artistic mediums, but share common needs in the creative process:",
            },
            {
              type: "bullets",
              items: [
                "Discover: Finding real places worth photographing, painting, or exploring.",
                "Create: Getting reliable visual references and drawing inspiration from other creators’ work.",
                "Connect: Wanting their work to be understood, cited, and built upon — not just liked.",
              ],
            },
            {
              type: "paragraph",
              text: "Yet existing products scatter these needs across different platforms.",
            },
            {
              type: "paragraph",
              text: "Map tools help people find places, but lack artistic content. Social media can showcase work, but rarely ties exploration to geographic place. Art communities usually lack location-based discovery. That pointed us to a design opportunity:",
            },
            {
              type: "quote",
              plain: true,
              text: "Can we turn a place from a mere geographic coordinate into a shared space for creative exploration and collaboration?",
            },
          ],
        },
        {
          id: "design-solution",
          level: 1,
          number: "3.",
          title: "Design Solution",
          blocks: [
            {
              type: "heading",
              text: "From Location Discovery to Creative Collaboration",
            },
            {
              type: "paragraph",
              text: "Artiverse uses the map as the primary interaction entry point, and builds a complete creative experience through three interconnected features.",
            },
            {
              type: "numbered",
              items: [
                {
                  title: "Explore Through Maps",
                  body: "Users can explore nearby photography and painting on a map, see the real places behind each work, and discover how different creators interpret the same scene.",
                },
                {
                  title: "Connect Creative Works",
                  body: "Painters can select existing photographs as references and cite the original photo when uploading new work, creating a link between photography and painting.",
                },
                {
                  title: "Encourage Meaningful Interactions",
                  body: "When a work is cited, the original photographer receives a notification and can see new creations derived from their photograph.",
                },
              ],
            },
            {
              type: "paragraph",
              text: "Through these links between works, Artiverse turns one-way content browsing into ongoing creative interaction.",
            },
            {
              type: "mediaRow",
              items: [
                {
                  src: "/images/artiverse-whats-missing.png",
                  alt: "What's missing from existing apps — Instagram, Google Maps, and ArtStation",
                  width: 1024,
                  height: 575,
                },
                {
                  src: "/images/artiverse-proposition.png",
                  alt: "Our proposition — Artiverse at the intersection of Community, Map, and Art Showcase",
                  width: 1024,
                  height: 569,
                },
              ],
            },
          ],
        },
        {
          id: "interaction-design",
          level: 1,
          number: "4.",
          title: "Interaction Design",
          blocks: [
            {
              type: "heading",
              text: "Designing a Two-Sided Creative Experience",
            },
            {
              type: "paragraph",
              text: "Around the different needs of photographers and painters, we designed two core user journeys that connect to each other.",
            },
            {
              type: "heading",
              text: "Photographer Journey",
            },
            {
              type: "paragraph",
              text: "Photographers upload work and tag the shooting location. The work then appears on the community map. When other creators cite the photo in a painting, the photographer receives a notification and learns how their work inspired new creation.",
            },
            {
              type: "image",
              src: "/images/artiverse-photographer-flow.png",
              alt: "Photographer journey flow — upload works, select medium, tag location, and notify when cited",
              width: 1024,
              height: 317,
            },
            {
              type: "heading",
              text: "Artist Journey",
            },
            {
              type: "paragraph",
              text: "Painters discover photographs through the map, choose a suitable visual reference for their own work, and link back to the original photograph when publishing.",
            },
            {
              type: "image",
              src: "/images/artiverse-artist-flow.png",
              alt: "Artist journey flow — explore the community map, find artworks, download inspiration, and visit locations",
              width: 1024,
              height: 318,
            },
            {
              type: "heading",
              text: "Interaction Highlight — Closing the Creative Loop",
            },
            {
              type: "paragraph",
              text: "These two paths are not independent feature flows — they are connected through work citation and notifications.",
            },
            {
              type: "image",
              src: "/images/artiverse-creative-loop.png",
              alt: "Closing the creative loop — photographer and painter journeys connected through map discovery and citation notifications",
              width: 1024,
              height: 365,
            },
            {
              type: "paragraph",
              text: "Through this interaction loop, users can not only discover and share art, but also see the relationships between different creations.",
            },
          ],
        },
        {
          id: "future-possibilities",
          level: 1,
          number: "5.",
          title: "Future Possibilities",
          blocks: [
            {
              type: "heading",
              text: "Beyond Photography and Painting",
            },
            {
              type: "paragraph",
              text: "Artiverse began by focusing on collaboration between photography and landscape painting, but location-based creative discovery can extend to more art forms, including:",
            },
            {
              type: "bullets",
              items: [
                "Digital Art & Illustration",
                "Film & Animation",
                "Music & Sound Design",
                "Poetry & Writing",
              ],
            },
            {
              type: "paragraph",
              text: "In the future, Artiverse can grow into a cross-medium creative community anchored in real places — letting different art forms connect around shared space, memory, and experience.",
            },
          ],
        },
      ],
    },
    cn: {
      title: "Artiverse",
      description: "一个基于地理位置的创意社区",
      tags: ["UX 设计", "设计黑客松"],
      timeline: ["CMU · UXA 黑客松 · 8 小时"],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "概述",
          blocks: [
            {
              type: "paragraph",
              text: "Artiverse 创作于 CMU 举行的以 “Bringing People Closer” 为主题的 8 小时 UX Design Hackathon。围绕如何通过数字产品促进人与人之间更有意义的连接，我们将目光投向了摄影师与绘画创作者这两个创作方式不同、却共享视觉灵感与创作场景的群体。",
            },
            {
              type: "paragraph",
              text: "基于双方在地点探索、创作素材获取与作品交流方面的共同需求，我们设计了 Artiverse——一个以地理位置为核心的跨媒介艺术社区。用户可以通过地图发现真实地点及其关联的摄影、绘画作品，并通过作品引用、创作关联与通知反馈建立联系，让一次简单的灵感获取延伸为持续的创作互动。",
            },
            {
              type: "image",
              src: "/videos/artiverse-demo.mp4",
              alt: "Artiverse 演示视频",
              width: 1908,
              height: 1080,
              controls: true,
              loop: false,
            },
          ],
        },
        {
          id: "design-challenge",
          level: 1,
          number: "2.",
          title: "设计挑战",
          blocks: [
            {
              type: "quote",
              text: "我们如何通过共享地点，连接不同的创作社群？",
            },
            {
              type: "image",
              src: "/images/artiverse-target-landscape-artist.png",
              alt: "目标用户——风景画家人设：Risa、工作流、挑战与参考视觉",
              width: 1024,
              height: 551,
            },
            {
              type: "image",
              src: "/images/artiverse-target-photographer.png",
              alt: "目标用户——摄影师人设：Bryan、工作流、挑战与地点摄影",
              width: 1024,
              height: 550,
            },
            {
              type: "image",
              src: "/images/artiverse-overlapping-pain-points.png",
              alt: "现状——重叠痛点：创作交叉启发、发现、社区反馈与署名归属",
              width: 1024,
              height: 549,
            },
            {
              type: "paragraph",
              spacedTop: true,
              text: "摄影师与绘画创作者虽然使用不同的艺术媒介，但在创作过程中存在共同需求：",
            },
            {
              type: "bullets",
              items: [
                "Discover：寻找值得拍摄、绘画或探索的真实地点。",
                "Create：获取可靠的视觉参考，并从其他创作者的作品中获得灵感。",
                "Connect：希望自己的作品被理解、引用和进一步创作，而不仅仅是获得点赞。",
              ],
            },
            {
              type: "paragraph",
              text: "然而，现有产品往往将这些需求分散在不同平台中。",
            },
            {
              type: "paragraph",
              text: "地图工具能够帮助用户寻找地点，却缺少艺术创作内容；社交媒体能够展示作品，却难以建立作品与地理位置之间的探索关系；艺术社区则通常缺少基于地点的发现机制。因此我们发现了一个设计机会：",
            },
            {
              type: "quote",
              plain: true,
              text: "我们能否将一个地点从单纯的地理坐标，转变为一个用于创意探索与协作的共享空间？",
            },
          ],
        },
        {
          id: "design-solution",
          level: 1,
          number: "3.",
          title: "设计方案",
          blocks: [
            {
              type: "heading",
              text: "从地点发现到创作协作",
            },
            {
              type: "paragraph",
              text: "Artiverse 以地图作为主要交互入口，通过三个相互关联的功能构建完整的创作体验。",
            },
            {
              type: "numbered",
              items: [
                {
                  title: "通过地图探索",
                  body: "用户可以通过地图探索附近的摄影和绘画作品，查看作品对应的真实地点，并发现不同创作者对同一场景的艺术表达。",
                },
                {
                  title: "连接创作作品",
                  body: "绘画创作者可以选择已有摄影作品作为参考，在上传新作品时引用原始照片，建立摄影与绘画之间的关联关系。",
                },
                {
                  title: "鼓励有意义的互动",
                  body: "当作品被引用时，原摄影师会收到通知，并能够查看由自己的摄影作品衍生出的新创作。",
                },
              ],
            },
            {
              type: "paragraph",
              text: "通过作品之间的关联，Artiverse 将传统的单向内容浏览转变为持续的创作互动。",
            },
            {
              type: "mediaRow",
              items: [
                {
                  src: "/images/artiverse-whats-missing.png",
                  alt: "现有应用缺什么——Instagram、Google Maps 与 ArtStation",
                  width: 1024,
                  height: 575,
                },
                {
                  src: "/images/artiverse-proposition.png",
                  alt: "我们的主张——Artiverse 位于社区、地图与艺术展示的交汇处",
                  width: 1024,
                  height: 569,
                },
              ],
            },
          ],
        },
        {
          id: "interaction-design",
          level: 1,
          number: "4.",
          title: "交互设计",
          blocks: [
            {
              type: "heading",
              text: "设计双边创作体验",
            },
            {
              type: "paragraph",
              text: "围绕摄影师与绘画创作者的不同需求，我们设计了两条相互连接的核心用户流程。",
            },
            {
              type: "heading",
              text: "摄影师旅程",
            },
            {
              type: "paragraph",
              text: "摄影师上传作品并标记拍摄地点，作品随后展示在社区地图中。当其他创作者引用照片完成绘画时，摄影师会收到通知，了解自己的作品如何启发新的创作。",
            },
            {
              type: "image",
              src: "/images/artiverse-photographer-flow.png",
              alt: "摄影师旅程流程——上传作品、选择媒介、标记地点，并在被引用时收到通知",
              width: 1024,
              height: 317,
            },
            {
              type: "heading",
              text: "绘画创作者旅程",
            },
            {
              type: "paragraph",
              text: "绘画创作者通过地图发现摄影作品，选择合适的视觉参考进行创作，并在发布时关联原摄影作品。",
            },
            {
              type: "image",
              src: "/images/artiverse-artist-flow.png",
              alt: "绘画创作者旅程流程——探索社区地图、发现作品、下载灵感并前往地点",
              width: 1024,
              height: 318,
            },
            {
              type: "heading",
              text: "交互亮点——闭合创作闭环",
            },
            {
              type: "paragraph",
              text: "这两条用户路径并不是独立的功能流程，而是通过作品引用与通知机制连接起来。",
            },
            {
              type: "image",
              src: "/images/artiverse-creative-loop.png",
              alt: "闭合创作闭环——摄影师与绘画创作者旅程通过地图发现与引用通知相连",
              width: 1024,
              height: 365,
            },
            {
              type: "paragraph",
              text: "通过这一交互闭环，用户不仅能够发现和分享艺术作品，也能够看到不同创作之间的联系。",
            },
          ],
        },
        {
          id: "future-possibilities",
          level: 1,
          number: "5.",
          title: "未来可能",
          blocks: [
            {
              type: "heading",
              text: "超越摄影与绘画",
            },
            {
              type: "paragraph",
              text: "Artiverse 最初聚焦于摄影与风景绘画之间的协作，但基于地理位置的创作发现机制也可以扩展至更多艺术形式，包括：",
            },
            {
              type: "bullets",
              items: [
                "Digital Art & Illustration",
                "Film & Animation",
                "Music & Sound Design",
                "Poetry & Writing",
              ],
            },
            {
              type: "paragraph",
              text: "未来，Artiverse 可以进一步发展为一个以真实地点为连接点的跨媒介创作社区，让不同艺术形式围绕共同的空间、记忆与体验产生联系。",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "branchable-ai",
    image: "/images/branchable-ai-cover.png",
    imageAlt:
      "Branchable AI cover — overlapping speech bubbles on a yellow-orange ground",
    showInHomeGrid: true,
    en: {
      title: "Branchable AI",
      description:
        "Rethinking AI conversations from linear message history into explorable, composable information.",
      tags: ["AI Product", "Context Engineering", "Conversational UX"],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "Branchable AI is a nonlinear AI conversation interface currently in development. It explores how users can organize, explore, and reuse AI-generated information more flexibly.",
            },
            {
              type: "paragraph",
              text: "Traditional AI chat treats continuous messages as the basic unit of interaction. As a discussion deepens, users often have to dig through long transcripts for key points, or restate past ideas to bring them back into the current conversation.",
            },
            {
              type: "paragraph",
              text: "This project tries a different interaction structure: breaking a full answer into independently operable Information Units, so users can explore around a specific piece of information, create branches, and freely compose content from different discussion paths.",
            },
            {
              type: "paragraph",
              text: "By combining nonlinear information organization with Context Engineering, Branchable AI aims to move users from passively receiving AI answers toward actively shaping the reasoning context AI uses next.",
            },
            {
              type: "heading",
              text: "Current Demo (in development)",
            },
            {
              type: "image",
              src: "/videos/branchable-ai-demo.mp4",
              alt: "Branchable AI current demo — work in progress",
              caption:
                "Branchable AI builds upon the open-source GitChat project by DrustZ.",
              width: 1920,
              height: 1080,
              controls: true,
              loop: false,
            },
          ],
        },
        {
          id: "design-challenge",
          level: 1,
          number: "2.",
          title: "Design Challenge",
          blocks: [
            {
              type: "heading",
              text: "The Problem Is Not Conversation Length, but Context Control",
            },
            {
              type: "paragraph",
              text: "As AI shifts from a simple Q&A tool into a partner for learning, research, and complex work, the limits of the traditional linear chat interface become clearer.",
            },
            {
              type: "heading",
              text: "01 / Linear Conversations Fragment Complex Thinking",
            },
            {
              type: "paragraph",
              text: "Complex problems usually contain multiple related directions that can still be explored independently.",
            },
            {
              type: "paragraph",
              text: "For example, when a user asks how to start a Unity VR project from scratch, the AI may cover everything from environment setup and project configuration to interaction development.",
            },
            {
              type: "paragraph",
              text: "But if the user only wants to go deeper into XR Configuration, traditional chat often requires a new message — and that follow-up is then appended to the same timeline.",
            },
            {
              type: "paragraph",
              text: "As exploration continues, different topics intertwine, and a once-clear task structure is gradually replaced by linear message order.",
            },
            {
              type: "heading",
              text: "02 / Information Is Difficult to Reuse Across Conversations",
            },
            {
              type: "paragraph",
              text: "Valuable information in AI answers is often scattered across messages and discussion branches.",
            },
            {
              type: "paragraph",
              text: "A user may want to combine a technical approach from one branch, constraints from another, and design goals from a third for further analysis.",
            },
            {
              type: "paragraph",
              text: "Traditional chat interfaces lack a direct way to select and compose that information. Users usually copy by hand, restate it, or hope the model recovers it from history.",
            },
            {
              type: "heading",
              text: "03 / Users Have Limited Visibility into Context Construction",
            },
            {
              type: "paragraph",
              text: "In long conversations, users often cannot tell which past information the model is actually using for the next answer.",
            },
            {
              type: "paragraph",
              text: "Even when the model can use conversation context, users lack an interface for organizing and specifying that information.",
            },
            {
              type: "paragraph",
              text: "So the core question is not how to make AI answers shorter. It is:",
            },
            {
              type: "quote",
              text: "How might we enable users to actively structure, explore, and compose the information that AI reasons with?",
            },
            {
              type: "paragraph",
              text: "How can users actively organize, explore, and compose information so they can control more precisely the context that shapes the AI’s next response?",
            },
          ],
        },
        {
          id: "product-insight",
          level: 1,
          number: "3.",
          title: "Product Insight",
          blocks: [
            {
              type: "heading",
              text: "Information Units as a New Interaction Primitive",
            },
            {
              type: "paragraph",
              text: "Traditional AI chat treats the Message as the basic unit of presentation and interaction.",
            },
            {
              type: "paragraph",
              text: "Even when one answer contains multiple independent concepts, steps, or arguments, they usually stay locked inside a single message container.",
            },
            {
              type: "paragraph",
              text: "Branchable AI proposes a different design idea:",
            },
            {
              type: "quote",
              text: "What if the smallest actionable element in an AI conversation were not a message, but an information unit?",
            },
            {
              type: "paragraph",
              text: "What happens if the smallest operable element in an AI conversation is no longer a whole message, but a semantically independent information unit inside it?",
            },
            {
              type: "paragraph",
              text: "In this design, AI answers first go through Semantic Decomposition and are organized into relatively independent Information Units.",
            },
            {
              type: "paragraph",
              text: "Each Information Unit carries content, and also has its own identity, provenance, and interaction capabilities.",
            },
            {
              type: "paragraph",
              text: "Users can:",
            },
            {
              type: "bullets",
              items: [
                "Explore — keep asking around one information unit and open an independent exploration path.",
                "Branch — organize different discussion directions into a nonlinear conversation structure.",
                "Connect — create relationships between information nodes on the canvas.",
                "Select — pick valuable information from different exploration branches.",
                "Compose — reorganize selected information into the context for the next round of AI reasoning.",
              ],
            },
            {
              type: "paragraph",
              text: "This turns AI answers from static text output into information structures that can be continually explored and recomposed.",
            },
          ],
        },
        {
          id: "interaction-design",
          level: 1,
          number: "4.",
          title: "Interaction Design",
          blocks: [
            {
              type: "heading",
              text: "From Reading Responses to Navigating Information",
            },
            {
              type: "paragraph",
              text: "The core interaction loop of Branchable AI is:",
            },
            {
              type: "quote",
              plain: true,
              text: "Ask → Decompose → Explore → Select → Compose → Ask Again",
            },
            {
              type: "heading",
              text: "01 / Semantic Decomposition",
            },
            {
              type: "heading",
              text: "Transforming AI Responses into Actionable Information Units",
            },
            {
              type: "paragraph",
              text: "After a user asks a question, the system no longer presents the answer only as one text block. It splits the response into multiple Information Units based on semantic structure.",
            },
            {
              type: "paragraph",
              text: "The number of units is not fixed — it changes with problem complexity, content structure, and task needs. Each node keeps its own title, content, unique ID, and provenance so it can take part in later interactions independently.",
            },
            {
              type: "heading",
              text: "02 / Unit-Level Exploration",
            },
            {
              type: "heading",
              text: "Exploring One Idea Without Losing the Others",
            },
            {
              type: "paragraph",
              text: "Users can select any Information Unit and ask follow-up questions around that content.",
            },
            {
              type: "paragraph",
              text: "The new answer becomes an independent exploration branch and is decomposed into Information Units again.",
            },
            {
              type: "paragraph",
              text: "That means users can go deep on one specific question without appending every discussion to the same linear chat log.",
            },
            {
              type: "paragraph",
              text: "Meanwhile, other information nodes stay in place, so users can return or continue exploring at any time.",
            },
            {
              type: "paragraph",
              text: "Besides system-generated units, users can also select specific text in an answer and use it as the starting point for further questions.",
            },
            {
              type: "heading",
              text: "03 / Non-linear Information Canvas",
            },
            {
              type: "heading",
              text: "Making Conversation Structure Visible and Manipulable",
            },
            {
              type: "paragraph",
              text: "Branchable AI organizes AI conversation on an infinite canvas.",
            },
            {
              type: "paragraph",
              text: "Information Units appear as independent nodes that can be dragged, connected, and spatially arranged.",
            },
            {
              type: "paragraph",
              text: "Unlike a traditional mind map, the canvas is not only for showing relationships between concepts. It also shows how users explore information and how different answers relate to their sources.",
            },
            {
              type: "paragraph",
              text: "Users can organize discussion directions in space instead of depending entirely on the chronological order of messages.",
            },
            {
              type: "heading",
              text: "04 / Context Selection & Composition",
            },
            {
              type: "heading",
              text: "Letting Users Decide What the AI Should Reason With Next",
            },
            {
              type: "paragraph",
              text: "This is the core interaction mechanism of Branchable AI.",
            },
            {
              type: "paragraph",
              text: "Users can select multiple Information Units from different exploration branches and add them to Selected Context.",
            },
            {
              type: "paragraph",
              text: "The system combines the selected content with necessary provenance, the original question, and contextual relationships to build a new Context Payload.",
            },
            {
              type: "paragraph",
              text: "When the user asks a new question, the AI answers based on these explicitly chosen pieces of information — not only on the full linear chat history.",
            },
            {
              type: "paragraph",
              text: "For example, a user can separately explore technical implementation, user needs, and product constraints, then compose key conclusions from all three branches and ask the AI for a new design proposal.",
            },
            {
              type: "paragraph",
              text: "Context is no longer only a history record maintained by the system. It becomes a design object users can operate directly.",
            },
          ],
        },
        {
          id: "system-architecture",
          level: 1,
          number: "5.",
          title: "System Architecture",
          blocks: [
            {
              type: "heading",
              text: "Separating Information, Interaction, and Context",
            },
            {
              type: "paragraph",
              text: "To support information-level exploration and context recomposition, Branchable AI divides system logic into three related layers.",
            },
            {
              type: "heading",
              text: "Information Layer",
            },
            {
              type: "paragraph",
              text: "Structured Information Units store AI-generated units and their provenance. Each Information Unit has its own ID, content, parent answer, and related context identifiers, so information can leave the original message container and be referenced or reused independently.",
            },
            {
              type: "heading",
              text: "Interaction Layer",
            },
            {
              type: "paragraph",
              text: "The Non-linear Graph Interface maps Information Units onto interactive canvas nodes. Users can drag, connect, select, and create branches to organize information. This layer manages visualization and user actions; it is not the same as the model’s reasoning context.",
            },
            {
              type: "heading",
              text: "Context Layer",
            },
            {
              type: "paragraph",
              text: "User-directed Context Composition turns selected information into model input. The Context Composer extracts the corresponding content and necessary provenance from selected Information Units, then builds a new reasoning context together with the current question. This mechanism converts user operations on information into explicit control over the conditions of the AI’s next answer.",
            },
          ],
        },
        {
          id: "current-progress",
          level: 1,
          number: "6.",
          title: "Current Progress",
          blocks: [
            {
              type: "heading",
              text: "Building and Validating the Core Interaction Loop",
            },
            {
              type: "paragraph",
              text: "Branchable AI is still in MVP development and iteration.",
            },
          ],
        },
      ],
    },
    cn: {
      title: "Branchable AI",
      description:
        "重新思考 AI 对话：从线性消息历史，走向可探索、可组合的信息结构。",
      tags: ["AI 产品", "上下文工程", "对话式 UX"],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "Branchable AI 是一个正在开发中的非线性 AI 对话界面，旨在探索用户如何更灵活地组织、探索和复用 AI 生成的信息。",
            },
            {
              type: "paragraph",
              text: "传统 AI Chat 以连续的消息（Message）作为基本交互单位。随着讨论不断深入，用户往往需要在冗长的聊天记录中寻找关键信息，或通过重复描述将过去的观点重新引入当前对话。",
            },
            {
              type: "paragraph",
              text: "这一项目尝试改变 AI 对话的基本交互结构：将完整回答拆解为可独立操作的 Information Units（信息单元），使用户能够围绕特定信息展开探索、创建分支，并自由组合来自不同讨论路径的内容。",
            },
            {
              type: "paragraph",
              text: "通过将非线性信息组织与 Context Engineering 相结合，Branchable AI 希望让用户从被动接收 AI 回答，转向主动参与 AI 推理上下文的构建。",
            },
            {
              type: "heading",
              text: "Current Demo（开发中）",
            },
            {
              type: "image",
              src: "/videos/branchable-ai-demo.mp4",
              alt: "Branchable AI 当前演示——仍在开发中",
              caption:
                "Branchable AI builds upon the open-source GitChat project by DrustZ.",
              width: 1920,
              height: 1080,
              controls: true,
              loop: false,
            },
          ],
        },
        {
          id: "design-challenge",
          level: 1,
          number: "2.",
          title: "Design Challenge",
          blocks: [
            {
              type: "heading",
              text: "The Problem Is Not Conversation Length, but Context Control",
            },
            {
              type: "paragraph",
              text: "随着 AI 从简单的问答工具逐渐成为学习、研究和复杂任务中的协作伙伴，传统线性聊天界面的局限也开始显现。",
            },
            {
              type: "heading",
              text: "01 / Linear Conversations Fragment Complex Thinking",
            },
            {
              type: "paragraph",
              text: "复杂问题通常包含多个相互关联但可以独立探索的方向。",
            },
            {
              type: "paragraph",
              text: "例如，当用户询问如何从零开始创建 Unity VR 项目时，AI 可能提供从环境安装、项目配置到交互开发的完整流程。",
            },
            {
              type: "paragraph",
              text: "但如果用户只想进一步理解其中的 XR Configuration，传统对话往往需要开启新的消息，而后续讨论又会被不断追加到同一条时间线上。",
            },
            {
              type: "paragraph",
              text: "随着探索深入，不同主题交织在一起，原本清晰的任务结构逐渐被线性的消息顺序取代。",
            },
            {
              type: "heading",
              text: "02 / Information Is Difficult to Reuse Across Conversations",
            },
            {
              type: "paragraph",
              text: "AI 回答中有价值的信息往往分散在不同消息和讨论分支中。",
            },
            {
              type: "paragraph",
              text: "用户可能希望结合一个分支中的技术方案、另一个分支中的限制条件，以及第三个分支中的设计目标，继续进行综合分析。",
            },
            {
              type: "paragraph",
              text: "然而，传统聊天界面缺少直接选择和组合这些信息的交互机制。用户通常需要手动复制、重新描述，或者依赖模型从历史记录中提取相关内容。",
            },
            {
              type: "heading",
              text: "03 / Users Have Limited Visibility into Context Construction",
            },
            {
              type: "paragraph",
              text: "在长对话中，用户通常难以明确判断模型下一轮回答究竟参考了哪些历史信息。",
            },
            {
              type: "paragraph",
              text: "虽然模型能够利用对话上下文，但用户缺少一个直观的界面来组织和指定这些信息。",
            },
            {
              type: "paragraph",
              text: "因此，这个项目关注的核心问题并不是如何让 AI 生成更短的回答，而是：",
            },
            {
              type: "quote",
              text: "How might we enable users to actively structure, explore, and compose the information that AI reasons with?",
            },
            {
              type: "paragraph",
              text: "我们如何让用户主动组织、探索和组合信息，从而更精细地控制 AI 后续回答所依据的上下文？",
            },
          ],
        },
        {
          id: "product-insight",
          level: 1,
          number: "3.",
          title: "Product Insight",
          blocks: [
            {
              type: "heading",
              text: "Information Units as a New Interaction Primitive",
            },
            {
              type: "paragraph",
              text: "传统 AI Chat 将 Message 作为信息呈现与交互的基本单位。",
            },
            {
              type: "paragraph",
              text: "即使一条回答包含多个独立的概念、步骤或论点，它们通常仍然被封装在同一个消息容器中。",
            },
            {
              type: "paragraph",
              text: "Branchable AI 提出一个不同的设计思路：",
            },
            {
              type: "quote",
              text: "What if the smallest actionable element in an AI conversation were not a message, but an information unit?",
            },
            {
              type: "paragraph",
              text: "如果 AI 对话中最小的可操作元素不再是一整条消息，而是其中具有独立语义的信息单元，会发生什么？",
            },
            {
              type: "paragraph",
              text: "在这一设计中，AI 生成的回答首先经过 Semantic Decomposition（语义拆解），被组织为多个相对独立的 Information Units。",
            },
            {
              type: "paragraph",
              text: "每个 Information Unit 不仅承载内容，还拥有独立的身份、来源关系和交互能力。",
            },
            {
              type: "paragraph",
              text: "用户可以：",
            },
            {
              type: "bullets",
              items: [
                "Explore — 围绕某个信息单元继续提问，展开独立的探索路径。",
                "Branch — 将不同讨论方向组织为非线性对话结构。",
                "Connect — 在画布中建立不同信息节点之间的关系。",
                "Select — 从不同探索分支中选择有价值的信息。",
                "Compose — 将选中的信息重新组织为下一轮 AI 推理的上下文。",
              ],
            },
            {
              type: "paragraph",
              text: "这一设计使 AI 回答从静态的文本输出，转变为可持续探索和重新组合的信息结构。",
            },
          ],
        },
        {
          id: "interaction-design",
          level: 1,
          number: "4.",
          title: "Interaction Design",
          blocks: [
            {
              type: "heading",
              text: "From Reading Responses to Navigating Information",
            },
            {
              type: "paragraph",
              text: "Branchable AI 的核心交互围绕一个循环展开：",
            },
            {
              type: "quote",
              plain: true,
              text: "Ask → Decompose → Explore → Select → Compose → Ask Again",
            },
            {
              type: "heading",
              text: "01 / Semantic Decomposition",
            },
            {
              type: "heading",
              text: "Transforming AI Responses into Actionable Information Units",
            },
            {
              type: "paragraph",
              text: "当用户提出问题后，系统不再仅以单一文本块呈现回答，而是根据内容的语义结构，将其拆分为多个 Information Units。",
            },
            {
              type: "paragraph",
              text: "拆分数量不固定，而是根据问题的复杂度、内容结构和任务需求动态确定。每个节点保留自身的标题、内容、唯一标识及来源信息，使其能够独立参与后续交互。",
            },
            {
              type: "heading",
              text: "02 / Unit-Level Exploration",
            },
            {
              type: "heading",
              text: "Exploring One Idea Without Losing the Others",
            },
            {
              type: "paragraph",
              text: "用户可以选择任意 Information Unit，围绕其中的内容进一步提问。",
            },
            {
              type: "paragraph",
              text: "新的回答会形成独立的探索分支，并再次被拆解为 Information Units。",
            },
            {
              type: "paragraph",
              text: "这意味着用户可以深入研究某个具体问题，而不必将所有讨论追加到同一条线性聊天记录中。",
            },
            {
              type: "paragraph",
              text: "与此同时，其他信息节点仍然保留在原有结构中，用户可以随时返回或继续探索。",
            },
            {
              type: "paragraph",
              text: "除了系统生成的信息单元，用户也可以选中回答中的特定文本，将其作为进一步提问的起点。",
            },
            {
              type: "heading",
              text: "03 / Non-linear Information Canvas",
            },
            {
              type: "heading",
              text: "Making Conversation Structure Visible and Manipulable",
            },
            {
              type: "paragraph",
              text: "Branchable AI 使用无限画布组织 AI 对话。",
            },
            {
              type: "paragraph",
              text: "Information Units 以独立节点的形式呈现，支持拖动、连接与空间组织。",
            },
            {
              type: "paragraph",
              text: "与传统思维导图不同，画布不仅用于展示概念之间的关系，也用于呈现用户探索信息的过程，以及不同回答之间的来源关系。",
            },
            {
              type: "paragraph",
              text: "用户可以在空间中组织讨论方向，而不必完全依赖消息产生的时间顺序。",
            },
            {
              type: "heading",
              text: "04 / Context Selection & Composition",
            },
            {
              type: "heading",
              text: "Letting Users Decide What the AI Should Reason With Next",
            },
            {
              type: "paragraph",
              text: "这是 Branchable AI 最核心的交互机制。",
            },
            {
              type: "paragraph",
              text: "用户可以从不同探索分支中选择多个 Information Units，将它们加入 Selected Context。",
            },
            {
              type: "paragraph",
              text: "系统将选中的内容与必要的来源信息、原始问题和上下文关系组合，构建新的 Context Payload。",
            },
            {
              type: "paragraph",
              text: "当用户提出新的问题时，AI 将基于这些明确选择的信息生成回答，而不是仅仅依赖完整的线性聊天历史。",
            },
            {
              type: "paragraph",
              text: "例如，用户可以分别探索技术实现、用户需求与产品限制，再将三个分支中的关键结论组合起来，要求 AI 提出新的设计方案。",
            },
            {
              type: "paragraph",
              text: "Context 不再只是系统自动维护的历史记录，而成为用户能够直接操作的设计对象。",
            },
          ],
        },
        {
          id: "system-architecture",
          level: 1,
          number: "5.",
          title: "System Architecture",
          blocks: [
            {
              type: "heading",
              text: "Separating Information, Interaction, and Context",
            },
            {
              type: "paragraph",
              text: "为了支持信息级别的探索与上下文重组，Branchable AI 将系统逻辑划分为三个相互关联的层次。",
            },
            {
              type: "heading",
              text: "Information Layer",
            },
            {
              type: "paragraph",
              text: "Structured Information Units 负责存储 AI 生成的信息单元及其来源关系。每个 Information Unit 拥有独立 ID、内容、所属回答及相关上下文标识，使信息能够脱离原始消息容器，被独立引用和复用。",
            },
            {
              type: "heading",
              text: "Interaction Layer",
            },
            {
              type: "paragraph",
              text: "Non-linear Graph Interface 负责将 Information Units 映射为可交互的画布节点。用户可以通过拖动、连接、选择和创建分支来组织信息。这一层主要管理信息的可视化呈现与用户操作，不直接等同于模型的推理上下文。",
            },
            {
              type: "heading",
              text: "Context Layer",
            },
            {
              type: "paragraph",
              text: "User-directed Context Composition 负责将用户选择的信息转换为模型输入。Context Composer 根据选中的 Information Units，提取对应内容及必要的来源信息，并结合当前问题构建新的推理上下文。这一机制将用户对信息的操作转化为对 AI 后续回答条件的显式控制。",
            },
          ],
        },
        {
          id: "current-progress",
          level: 1,
          number: "6.",
          title: "Current Progress",
          blocks: [
            {
              type: "heading",
              text: "Building and Validating the Core Interaction Loop",
            },
            {
              type: "paragraph",
              text: "Branchable AI 目前仍处于 MVP 开发与迭代阶段。",
            },
          ],
        },
      ],
    },
  },
  {
    slug: "sellassis",
    image: "/images/sellassis-cover.png",
    imageAlt:
      "SellAssis cover — Facebook marketplace icon on a blue icon-grid and keyline background",
    en: {
      title: "SellAssis",
      description:
        "An AI Selling Agent that helps users complete secondhand deals — from listing products to talking with buyers.",
      tags: ["AI Agent", "AI Product"],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "Overview",
          blocks: [
            {
              type: "paragraph",
              text: "Facebook Marketplace is one of the main secondhand trading platforms in the U.S. Data shows that 56% of U.S. secondhand consumers have used Facebook Marketplace, keeping it in the top tier of online secondhand platforms for a long time.",
            },
            {
              type: "paragraph",
              text: "Selling a used item on Facebook Marketplace looks like “upload photos and post,” but it actually involves a chain of continuous, repetitive actions: organizing product photos, filling in details, judging price, generating a listing, operating the platform to publish, replying to buyers, negotiating, and finally closing the deal.",
            },
            {
              type: "paragraph",
              text: "Existing AI tools can already help generate titles or descriptions, but most of that capability stays at the level of a single task. Users still have to repeatedly supply information across steps, decide what comes next, and operate the platform by hand.",
            },
            {
              type: "paragraph",
              text: "Based on that pain point, I designed and built SellAssis — an AI Selling Agent that runs in the browser. Users only need to provide product photos and a basic selling intent; the Agent then gradually completes product understanding, listing generation and review, Marketplace page operations, and later buyer communication.",
            },
            {
              type: "heading",
              text: "Product Demo",
            },
            {
              type: "image",
              src: "/videos/sellassis-demo.mp4",
              alt: "SellAssis product demo video",
              width: 1870,
              height: 1080,
              controls: true,
              loop: false,
            },
          ],
        },
        {
          id: "product-architecture",
          level: 1,
          number: "2.",
          title: "Product Architecture",
          blocks: [
            {
              type: "paragraph",
              text: "SellAssis is designed around two core secondhand-trading scenarios, with a connected Listing Workflow and Message Agent.",
            },
            {
              type: "paragraph",
              text: "In the listing stage, the system combines multimodal product recognition, listing content optimization, similar-product retrieval, and browser automation to turn user input into a publishable Marketplace listing. In the messaging stage, the Message Agent uses seller preferences, product information, and conversation history to recognize buyer intent and generate replies that fit the deal conditions.",
            },
            {
              type: "paragraph",
              text: "The two workflows share context through structured product information and persistent memory, so the Agent can extend from one-shot content generation into ongoing deal assistance.",
            },
            {
              type: "image",
              src: "/images/sellassis-architecture.png",
              alt: "SellAssis product architecture — Listing Workflow and Message Agent",
              width: 954,
              height: 828,
            },
            {
              type: "heading",
              text: "Listing Workflow｜Multimodal understanding and automated publishing",
            },
            {
              type: "paragraph",
              text: "Users upload product photos and describe their selling goal in natural language — for example, “I want to sell this quickly.”",
            },
            {
              type: "paragraph",
              text: "SellAssis first uses a vision model to extract category, brand, appearance, and other recognizable product features, then combines that with user intent to generate an initial listing draft. After that, Listing Skill and Image Skill process product content and visual assets in parallel:",
            },
            {
              type: "heading",
              text: "Listing Skill｜Content generation and quality evaluation",
            },
            {
              type: "paragraph",
              text: "Based on product information and the selling goal, it generates a title, description, and price suggestion, then checks listing quality across authenticity, completeness, natural expression, and attractiveness — avoiding overselling, templated wording, or unsupported product claims.",
            },
            {
              type: "heading",
              text: "Image Skill｜Product retrieval and visual optimization",
            },
            {
              type: "paragraph",
              text: "It retrieves original product images and similar-item references through feature matching to help identify the model and verify information. It also supports AI background optimization that improves presentation while preserving the real product, appearance, and defects.",
            },
            {
              type: "image",
              src: "/images/sellassis-image-skill.jpg",
              alt: "Image Skill prototype — photo cleanup and lifestyle scene editing beside Facebook Marketplace",
              caption: "[Prototype screenshot]",
              width: 1024,
              height: 579,
            },
            {
              type: "heading",
              text: "Facebook Skill｜Page awareness and automated execution",
            },
            {
              type: "paragraph",
              text: "After product prep is ready, Facebook Skill uses an Observer to read the current Marketplace page state, maps product fields onto the form, and executes image upload, form filling, and page actions.",
            },
            {
              type: "paragraph",
              text: "After key actions, the system re-validates page state and reviews Facebook Meta AI’s generated results for necessary corrections. When product information is uncertain or publishing confirmation is needed, control returns to the user.",
            },
          ],
        },
        {
          id: "message-agent",
          level: 1,
          number: "3.",
          title: "Message Agent",
          blocks: [
            {
              type: "heading",
              text: "Message Agent｜Intent recognition and reply decisions grounded in layered memory",
            },
            {
              type: "paragraph",
              text: "After a listing is published, SellAssis uses a dedicated Message Agent to handle high-frequency, repetitive buyer questions on Marketplace — including item availability, price negotiation, pickup location, and scheduling. I designed Message Agent as an intelligent communication system with context awareness, deal-intent recognition, and tiered decision-making, built around three core mechanisms:",
            },
            {
              type: "image",
              src: "/images/sellassis-message-agent-flow.png",
              alt: "Message Agent flow — intent analysis, hierarchical memory retrieval, response plan, rule evaluation, and memory update",
              width: 928,
              height: 1024,
            },
            {
              type: "heading",
              text: "01｜Intent Understanding — multi-intent recognition and structured extraction",
            },
            {
              type: "paragraph",
              text: "Using an LLM, it recognizes deal intents in buyer messages — asking price, bargaining, product questions, pickup arrangements — and extracts key entities such as offered amount, time, and place, turning unstructured chat into deal requests the system can evaluate.",
            },
            {
              type: "heading",
              text: "02｜Hierarchical Memory — layered memory and dynamic context assembly",
            },
            {
              type: "paragraph",
              text: "It builds three memory layers — Seller Preference, Product Memory, and Conversation Memory — to manage long-term seller preferences, product facts and price boundaries, and each buyer’s conversation history and negotiation progress.",
            },
            {
              type: "paragraph",
              text: "Based on the current intent, the system retrieves only the relevant context instead of resending the full history every turn. It also keeps updating offers, appointment status, and conversation summaries so different deal stages share consistent information.",
            },
            {
              type: "heading",
              text: "Memory Architecture — layered memory and context management",
            },
            {
              type: "table",
              headers: ["Memory Layer", "Stored Content", "Data Scope", "Lifecycle"],
              rows: [
                [
                  "Seller Preference",
                  "Default pickup area, trading preferences, reply preferences",
                  "User-level",
                  "Persisted across listings",
                ],
                [
                  "Product Memory",
                  "Product facts, asking price, minimum price, listing status",
                  "Listing-level",
                  "Stored per listing",
                ],
                [
                  "Conversation Memory",
                  "Message history, offers, pickup plans, conversation summaries",
                  "Buyer-level",
                  "Stored per buyer conversation",
                ],
              ],
            },
            {
              type: "paragraph",
              text: "Table 1: Memory Structure",
            },
            {
              type: "heading",
              text: "Memory Storage — how information is stored and updated",
            },
            {
              type: "table",
              headers: ["Data Object", "Key Fields", "Update Timing"],
              rows: [
                [
                  "UserSettings",
                  "pickup_area, pickup_preference, reply_preference",
                  "When the user edits personal preferences",
                ],
                [
                  "ListingRecord",
                  "product_facts, asking_price, minimum_price, listing_status",
                  "When a listing is created, edited, or sold",
                ],
                [
                  "ConversationState",
                  "buyer_id, current_offer, pickup_time, conversation_summary",
                  "After a message arrives or a deal arrangement is confirmed",
                ],
              ],
            },
            {
              type: "paragraph",
              text: "Table 2: Memory Storage Design",
            },
            {
              type: "paragraph",
              text: "Suppose a buyer sends:",
            },
            {
              type: "quote",
              text: "Can you do $20? I can pick it up tomorrow.",
            },
            {
              type: "heading",
              text: "Step 1 — Intent Extraction",
            },
            {
              type: "code",
              text: `{
  "intents": [
    "PRICE_NEGOTIATION",
    "PICKUP_SCHEDULING"
  ],
  "entities": {
    "offer_price": 20,
    "proposed_pickup": "tomorrow"
  }
}`,
            },
            {
              type: "heading",
              text: "Step 2 — Context Assembly",
            },
            {
              type: "paragraph",
              text: "The system reads:",
            },
            {
              type: "bullets",
              items: [
                "Product Memory — Asking Price: $35; Minimum Price: $25; Selling Goal: Sell Fast",
                "Seller Preference — Pickup Only; General Area: Squirrel Hill",
                "Conversation Memory — Previous Offer: None; Pickup Status: Not Confirmed",
              ],
            },
            {
              type: "heading",
              text: "Step 3 — Response Planning",
            },
            {
              type: "paragraph",
              text: "The LLM judges that the buyer’s offer is below the minimum acceptable price, generates a counter-offer suggestion, and recognizes that the pickup time still needs user confirmation.",
            },
            {
              type: "heading",
              text: "Step 4 — Rule Evaluation",
            },
            {
              type: "paragraph",
              text: "Because price and a concrete pickup arrangement are involved, the system does not send the reply directly — it asks the seller to confirm first.",
            },
            {
              type: "heading",
              text: "Step 5 — Memory Update",
            },
            {
              type: "paragraph",
              text: "It stores the buyer’s $20 offer and the request to pick up tomorrow.",
            },
            {
              type: "image",
              src: "/images/sellassis-message-decision-pipeline.png",
              alt: "Message Agent decision pipeline — from buyer message through intent, context, response, rules, approval, and state update",
              width: 664,
              height: 906,
            },
            {
              type: "numbered",
              items: [
                {
                  title: "01｜Scope Isolation",
                  body: "Deal context for different listings and different buyers is managed independently to prevent cross-contamination.",
                },
                {
                  title: "02｜Selective Retrieval",
                  body: "Relevant memory is loaded on demand from the current message intent, instead of loading the full history every turn.",
                },
                {
                  title: "03｜Verified Updates",
                  body: "Buyer requests, Agent suggestions, and seller-confirmed commitments are kept distinct so incorrect information does not enter long-term memory.",
                },
              ],
            },
            {
              type: "heading",
              text: "03｜Policy-based Decision — autonomy guided by deal risk",
            },
            {
              type: "paragraph",
              text: "Language understanding from the LLM is separated from execution authority. A rule layer evaluates information completeness, the user’s authorization scope, and deal risk.",
            },
            {
              type: "table",
              headers: ["Condition", "Decision Logic", "System Behavior"],
              rows: [
                [
                  "Known product facts, no deal commitment",
                  "Clear information, low risk",
                  "Auto Reply",
                ],
                [
                  "Offer or price negotiation",
                  "Requires a pricing decision",
                  "Draft + User Approval",
                ],
                [
                  "Exact address or specific pickup time",
                  "Involves personal info or a deal commitment",
                  "User Approval",
                ],
                [
                  "Missing or conflicting product information",
                  "Lacks a trustworthy basis",
                  "Ask Seller",
                ],
                [
                  "Outside authorized deal scope",
                  "Execution permission not met",
                  "Pause Automation",
                ],
              ],
            },
            {
              type: "paragraph",
              text: "Table 3: Agent Decision Policy",
            },
            {
              type: "paragraph",
              text: "Through the decision chain Intent Recognition → Context Assembly → Response Generation → Rule Evaluation → Human Approval / Auto Reply, Message Agent not only reduces repetitive communication, but also keeps deal context continuous while ensuring critical decisions stay under user control.",
            },
          ],
        },
      ],
    },
    cn: {
      title: "智能二手交易 Agent",
      description:
        "从商品发布到买家沟通，协助用户完成二手交易流程的 AI Selling Agent。",
      tags: ["AI Agent", "AI Product"],
      sections: [
        {
          id: "overview",
          level: 1,
          number: "1.",
          title: "概览",
          blocks: [
            {
              type: "paragraph",
              text: "Facebook Marketplace 是美国最主要的二手交易平台之一。数据显示，56% 的美国二手消费者使用过 Facebook Marketplace，使其长期处于美国线上二手交易平台的第一梯队。",
            },
            {
              type: "paragraph",
              text: "在 Facebook Marketplace 出售一件二手商品，看起来只是“上传图片并发布”，实际却包含了一系列连续而重复的操作：整理商品图片、填写信息、判断价格、生成 Listing、操作平台发布、回复买家、议价，并最终完成交易。",
            },
            {
              type: "paragraph",
              text: "现有 AI 工具已经能够帮助用户生成商品标题或描述，但这些能力大多停留在单个任务上。用户仍然需要在不同步骤之间反复提供信息、判断下一步并手动操作平台。",
            },
            {
              type: "paragraph",
              text: "基于这个痛点，我设计并开发了智能二手交易 Agent，一个运行在浏览器中的 AI Selling Agent。用户只需要提供商品图片和基本出售意图，Agent 会逐步完成商品信息理解、售卖 Listing 生成与检查、Marketplace 页面操作，以及后续的买家沟通。",
            },
            {
              type: "heading",
              text: "产品 Demo",
            },
            {
              type: "image",
              src: "/videos/sellassis-demo.mp4",
              alt: "智能二手交易 Agent 产品演示视频",
              width: 1870,
              height: 1080,
              controls: true,
              loop: false,
            },
          ],
        },
        {
          id: "product-architecture",
          level: 1,
          number: "2.",
          title: "产品架构",
          blocks: [
            {
              type: "paragraph",
              text: "SellAssis 围绕二手交易中的两个核心场景，设计了相互衔接的 Listing Workflow 与 Message Agent。",
            },
            {
              type: "paragraph",
              text: "在发布阶段，系统结合多模态商品识别、Listing 内容优化、相似商品检索与浏览器自动化，将用户输入转化为可发布的 Marketplace Listing；在沟通阶段，Message Agent 基于卖家偏好、商品信息和历史对话，识别买家意图并生成符合交易条件的回复。",
            },
            {
              type: "paragraph",
              text: "两个工作流通过结构化商品信息与持久化 Memory 共享上下文，使 Agent 能够从一次性内容生成延伸到持续的交易协助。",
            },
            {
              type: "image",
              src: "/images/sellassis-architecture.png",
              alt: "SellAssis 产品架构——Listing Workflow 与 Message Agent",
              width: 954,
              height: 828,
            },
            {
              type: "heading",
              text: "Listing Workflow｜多模态理解与自动化发布",
            },
            {
              type: "paragraph",
              text: "用户上传商品图片，并通过自然语言描述出售目标，例如“希望尽快卖掉”。",
            },
            {
              type: "paragraph",
              text: "SellAssis 首先通过 Vision Model 提取商品类别、品牌、外观及可识别的商品特征，结合用户意图生成初始 Listing Draft。随后，Listing Skill 与 Image Skill 并行处理商品内容与视觉素材：",
            },
            {
              type: "heading",
              text: "Listing Skill｜内容生成与质量评估",
            },
            {
              type: "paragraph",
              text: "基于商品信息与出售目标生成标题、描述和价格建议，并从真实性、信息完整度、表达自然度及吸引力等维度检查 Listing 质量，避免过度营销、模板化表达或缺乏依据的商品描述。",
            },
            {
              type: "heading",
              text: "Image Skill｜商品检索与视觉优化",
            },
            {
              type: "paragraph",
              text: "通过商品特征匹配检索原始商品图及相似商品参考图，辅助商品型号识别与信息核对；同时支持 AI 背景优化，在保留真实商品主体、外观及瑕疵的前提下改善图片展示效果。",
            },
            {
              type: "image",
              src: "/images/sellassis-image-skill.jpg",
              alt: "Image Skill 原型——在 Facebook Marketplace 旁进行照片清理与场景编辑",
              caption: "[原型截图]",
              width: 1024,
              height: 579,
            },
            {
              type: "heading",
              text: "Facebook Skill｜页面感知与自动化执行",
            },
            {
              type: "paragraph",
              text: "完成商品准备后，Facebook Skill 通过 Observer 读取 Marketplace 当前页面状态，将商品信息映射至对应表单字段，并执行图片上传、信息填写与页面操作。",
            },
            {
              type: "paragraph",
              text: "系统在关键操作后重新验证页面状态，并结合 Facebook Meta AI 的生成结果进行内容检查与必要修正。当商品信息不确定或涉及发布确认时，将控制权交还用户。",
            },
          ],
        },
        {
          id: "message-agent",
          level: 1,
          number: "3.",
          title: "Message Agent",
          blocks: [
            {
              type: "heading",
              text: "Message Agent｜基于多层记忆的意图识别与回复决策",
            },
            {
              type: "paragraph",
              text: "商品发布后，SellAssis 通过独立的 Message Agent 处理 Marketplace 中高频、重复的买家询问，包括商品状态、价格协商、取货地点与时间安排。我将 Message Agent 设计为一个具备上下文感知、交易意图识别与分级决策能力的智能沟通系统，通过以下三个核心机制实现：",
            },
            {
              type: "image",
              src: "/images/sellassis-message-agent-flow.png",
              alt: "Message Agent 流程——意图分析、分层记忆检索、回复规划、规则评估与记忆更新",
              width: 928,
              height: 1024,
            },
            {
              type: "heading",
              text: "01｜Intent Understanding — 多意图识别与结构化信息提取",
            },
            {
              type: "paragraph",
              text: "基于 LLM 识别买家消息中的询价、议价、商品咨询、取货安排等交易意图，并提取报价金额、时间、地点等关键实体，将非结构化对话转换为可供系统判断的交易请求。",
            },
            {
              type: "heading",
              text: "02｜Hierarchical Memory — 分层记忆与动态上下文组装",
            },
            {
              type: "paragraph",
              text: "建立 Seller Preference、Product Memory 和 Conversation Memory 三层记忆结构，分别管理卖家长期偏好、商品事实与价格边界，以及不同买家的历史对话和协商进度。",
            },
            {
              type: "paragraph",
              text: "系统根据当前意图按需检索相关上下文，而非重复传入全部历史信息；同时持续更新报价、预约状态与对话摘要，使不同交易阶段能够共享一致的信息。",
            },
            {
              type: "heading",
              text: "Memory Architecture — 分层记忆与上下文管理",
            },
            {
              type: "table",
              headers: ["Memory Layer", "存储内容", "数据范围", "生命周期"],
              rows: [
                [
                  "Seller Preference",
                  "默认取货区域、交易方式、回复偏好",
                  "User-level",
                  "跨商品长期保存",
                ],
                [
                  "Product Memory",
                  "商品信息、挂牌价、最低售价、商品状态",
                  "Listing-level",
                  "每件商品独立保存",
                ],
                [
                  "Conversation Memory",
                  "历史消息、报价、取货安排、对话摘要",
                  "Buyer-level",
                  "每段买家对话独立保存",
                ],
              ],
            },
            {
              type: "paragraph",
              text: "表格 1：Memory Structure",
            },
            {
              type: "heading",
              text: "Memory Storage — 信息如何存储与更新",
            },
            {
              type: "table",
              headers: ["数据对象", "关键字段", "更新时机"],
              rows: [
                [
                  "UserSettings",
                  "pickup_area, pickup_preference, reply_preference",
                  "用户修改个人偏好时",
                ],
                [
                  "ListingRecord",
                  "product_facts, asking_price, minimum_price, listing_status",
                  "创建、修改或出售商品时",
                ],
                [
                  "ConversationState",
                  "buyer_id, current_offer, pickup_time, conversation_summary",
                  "收到消息或确认交易安排后",
                ],
              ],
            },
            {
              type: "paragraph",
              text: "表格 2：Memory Storage Design",
            },
            {
              type: "paragraph",
              text: "假设某个买家发送：",
            },
            {
              type: "quote",
              text: "Can you do $20? I can pick it up tomorrow.",
            },
            {
              type: "heading",
              text: "Step 1 — Intent Extraction",
            },
            {
              type: "code",
              text: `{
  "intents": [
    "PRICE_NEGOTIATION",
    "PICKUP_SCHEDULING"
  ],
  "entities": {
    "offer_price": 20,
    "proposed_pickup": "tomorrow"
  }
}`,
            },
            {
              type: "heading",
              text: "Step 2 — Context Assembly",
            },
            {
              type: "paragraph",
              text: "系统读取：",
            },
            {
              type: "bullets",
              items: [
                "Product Memory — Asking Price: $35；Minimum Price: $25；Selling Goal: Sell Fast",
                "Seller Preference — Pickup Only；General Area: Squirrel Hill",
                "Conversation Memory — Previous Offer: None；Pickup Status: Not Confirmed",
              ],
            },
            {
              type: "heading",
              text: "Step 3 — Response Planning",
            },
            {
              type: "paragraph",
              text: "LLM 判断买家报价低于最低接受价格，生成还价建议，并识别出取货时间需要用户确认。",
            },
            {
              type: "heading",
              text: "Step 4 — Rule Evaluation",
            },
            {
              type: "paragraph",
              text: "因为涉及价格和具体取货安排，系统不直接发送回复，而是请求卖家确认。",
            },
            {
              type: "heading",
              text: "Step 5 — Memory Update",
            },
            {
              type: "paragraph",
              text: "保存买家提出的 $20 报价及明天取货的请求。",
            },
            {
              type: "image",
              src: "/images/sellassis-message-decision-pipeline.png",
              alt: "Message Agent 决策链路——从买家消息到意图、上下文、回复、规则、审批与状态更新",
              width: 664,
              height: 906,
            },
            {
              type: "numbered",
              items: [
                {
                  title: "01｜Scope Isolation",
                  body: "不同商品、不同买家的交易上下文独立管理，防止信息串联。",
                },
                {
                  title: "02｜Selective Retrieval",
                  body: "根据当前消息意图按需读取相关记忆，而不是每轮都加载完整历史。",
                },
                {
                  title: "03｜Verified Updates",
                  body: "区分买家提出的请求、Agent 生成的建议和卖家已经确认的交易承诺，避免错误信息进入长期记忆。",
                },
              ],
            },
            {
              type: "heading",
              text: "03｜Policy-based Decision — 基于交易风险的自主决策",
            },
            {
              type: "paragraph",
              text: "将 LLM 的语言理解与交易执行权限分离，通过规则层评估信息完整度、用户授权范围和交易风险。",
            },
            {
              type: "table",
              headers: ["判断条件", "Decision Logic", "系统行为"],
              rows: [
                [
                  "已有商品事实，无交易承诺",
                  "信息明确、低风险",
                  "Auto Reply",
                ],
                [
                  "报价或议价",
                  "涉及价格决策",
                  "Draft + User Approval",
                ],
                [
                  "精确地址或具体取货时间",
                  "涉及个人信息或交易承诺",
                  "User Approval",
                ],
                [
                  "商品信息缺失或冲突",
                  "缺少可信依据",
                  "Ask Seller",
                ],
                [
                  "超出授权的交易范围",
                  "不满足执行权限",
                  "Pause Automation",
                ],
              ],
            },
            {
              type: "paragraph",
              text: "表格 3：Agent Decision Policy",
            },
            {
              type: "paragraph",
              text: "通过 Intent Recognition → Context Assembly → Response Generation → Rule Evaluation → Human Approval / Auto Reply 的决策链路，Message Agent 不仅能够减少重复沟通，还能够在保持交易上下文连续性的同时，确保关键决策始终处于用户控制之下。",
            },
          ],
        },
      ],
    },
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
        "Physical Computing",
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
      tags: ["计算设计", "产品设计", "物理计算"],
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

const homeProjectOrder = [
  "reddit-growth-os",
  "sellassis",
  "mwow-tunnel",
  "branchable-ai",
] as const;

export const homeProjects = homeProjectOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => p !== undefined);

/** Slugs shown on the homepage (project + research + creative). */
const homeTaggedSlugs = [
  ...homeProjectOrder,
  "fourth-trimester-health",
  "artiverse",
  "vr-chord",
  "pass-that-there",
  "crazy-baby-alarm",
] as const;

export function projectAnchorId(slug: string): string {
  return `home-project-${slug}`;
}

/** Unique homepage tags → matching project slugs (for jump-to-project). */
export function getHomeTagIndex(
  lang: ProjectLang,
): { tag: string; slugs: string[] }[] {
  const map = new Map<string, string[]>();

  for (const slug of homeTaggedSlugs) {
    const project = projects.find((p) => p.slug === slug);
    const tags = project?.[lang].tags;
    if (!tags) continue;
    for (const tag of tags) {
      const existing = map.get(tag);
      if (existing) {
        if (!existing.includes(slug)) existing.push(slug);
      } else {
        map.set(tag, [slug]);
      }
    }
  }

  return Array.from(map.entries()).map(([tag, slugs]) => ({ tag, slugs }));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectHref(lang: ProjectLang, slug: string): string {
  return `/projects/${lang}/${slug}/`;
}
