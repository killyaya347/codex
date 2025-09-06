# Momentum DEX Position Range Monitor

This small utility monitors a specific LP position on [Momentum DEX](https://app.mmt.finance/) and prints whether the position is currently in range.

该工具用于监控 [Momentum DEX](https://app.mmt.finance/) 上指定的 LP 持仓，并打印该仓位当前是否处于区间内。

## Setup

Install dependencies:

```bash
npm install
```

安装依赖：

```bash
npm install
```

## Configuration

Create a `.env` file with the following variables:

```
USER_ADDRESS=your_sui_address
TARGET_POSITION_ID=your_position_id
POLL_INTERVAL_SEC=20
TELEGRAM_BOT_TOKEN=telegram_bot_token
TELEGRAM_CHAT_ID=telegram_chat_id
```

创建 `.env` 文件并配置以下变量：

```
USER_ADDRESS=你的 Sui 地址
TARGET_POSITION_ID=需要监控的 Position ID
POLL_INTERVAL_SEC=20
TELEGRAM_BOT_TOKEN=Telegram 机器人 token
TELEGRAM_CHAT_ID=接收提醒的 chat id
```

## Run

```bash
npx ts-node index.ts
```

The script loads variables from `.env` and will output `in-range` or `out-of-range` each interval. When a position becomes out of range, a Telegram alert is sent.

运行脚本：

```bash
npx ts-node index.ts
```

脚本会自动读取 `.env` 中的变量，并在每次轮询时输出 `in-range` 或 `out-of-range`。当仓位出圈时，会发送 Telegram 提醒。
