<template>
  <article class="flow-graphic flow-graphic--orbit" aria-label="SQL 查询能力动态图">
    <div class="flow-graphic__copy">
      <p class="section-kicker">SQL Capability Map</p>
      <h3>围绕数据库核心组织四类查询能力</h3>
    </div>

    <svg class="flow-graphic__canvas" viewBox="0 0 720 260" role="img">
      <title>基本查询、连接查询、聚合统计和数据库视图围绕数据库核心</title>

      <circle class="flow-graphic__orbit" cx="360" cy="132" r="86" />
      <circle class="flow-graphic__orbit flow-graphic__orbit--reverse" cx="360" cy="132" r="118" />

      <g class="flow-graphic__database" transform="translate(300 84)">
        <rect width="120" height="96" rx="24" />
        <text x="60" y="42">MySQL</text>
        <text x="60" y="66">数据库核心</text>
      </g>

      <g class="flow-graphic__step" transform="translate(82 28)">
        <rect class="flow-graphic__pulse" width="136" height="76" rx="20" />
        <text x="68" y="44">基本查询</text>
      </g>

      <g class="flow-graphic__step" transform="translate(502 28)">
        <rect class="flow-graphic__pulse flow-graphic__pulse--delay-1" width="136" height="76" rx="20" />
        <text x="68" y="44">连接查询</text>
      </g>

      <g class="flow-graphic__step" transform="translate(82 160)">
        <rect class="flow-graphic__pulse flow-graphic__pulse--delay-2" width="136" height="76" rx="20" />
        <text x="68" y="44">聚合统计</text>
      </g>

      <g class="flow-graphic__step" transform="translate(502 160)">
        <rect class="flow-graphic__pulse flow-graphic__pulse--delay-3" width="136" height="76" rx="20" />
        <text x="68" y="44">数据库视图</text>
      </g>
    </svg>
  </article>
</template>
