const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

async function optimize(filePath) {
  const tmp = filePath + '.tmp'
  const ext = path.extname(filePath).toLowerCase()

  let pipeline = sharp(filePath).resize(1920, null, {
    fit: 'inside',
    withoutEnlargement: true,
  })

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true })
  } else if (ext === '.png') {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true })
    fs.unlinkSync(filePath)
    filePath = filePath.replace(/\.png$/i, '.jpg')
  }

  await pipeline.toFile(tmp)
  fs.renameSync(tmp, filePath)
  return filePath
}

async function walk(dir) {
  const files = fs.readdirSync(dir)
  for (const f of files) {
    const full = path.join(dir, f)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      await walk(full)
      continue
    }
    if (!/\.(jpg|jpeg|png)$/i.test(f)) continue

    const before = stat.size
    try {
      const newPath = await optimize(full)
      const after = fs.statSync(newPath).size
      console.log(`${full}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`)
    } catch (e) {
      console.error(`Error: ${full}`, e.message)
    }
  }
}

walk('public/images').then(() => console.log('Done'))
