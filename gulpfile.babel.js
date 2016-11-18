import gulp from 'gulp';
import merge from 'merge2';
import sourcemaps from 'gulp-sourcemaps';
// import sass from 'gulp-sass';
// import notify from 'gulp-notify';
// import autoprefixer from 'gulp-autoprefixer';
// import cleanCSS from 'gulp-clean-css';
// import zip from 'gulp-zip';
import fs from 'fs';
import del from 'del';
import ts from 'gulp-typescript';
//
// // scss文件路径
// const scssPath = 'src/css/scss/*.scss';
//
// function formatDate() {
//   let d = new Date();
//   return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
// }
//
// // 清除 dist 目录
// export const clean = () => del(['dist']);
//
// // 编译scss文件
// export function sassCompile() {
//   return gulp.src(scssPath)
//     .pipe(sourcemaps.init())
//     .pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError({
//       message: 'Error: <%= error.message %>',
//       title: 'Sass Error'
//     })))
//     .pipe(autoprefixer({
//       browsers: ['last 2 versions', 'IE >= 8'],
//       cascade: false
//     }))
//     .pipe(sourcemaps.write({ includeContent: false, sourceRoot: null }))
//     .pipe(gulp.dest('./src/css/'));
// }
//
// // 发布功能类
// class Dist {
//   // 压缩 dist 目录至 zip 文件
//   static zip() {
//     const p = JSON.parse(fs.readFileSync('./package.json'));
//     const name = `${p.cname || p.name}_${formatDate()}_v${p.version}.zip`;
//     return gulp.src('./dist/**/*')
//       .pipe(zip(name))
//       .pipe(gulp.dest('./package/'));
//   }
//
//   // 复制 html 文件
//   static html() {
//     return gulp.src('*.html')
//       .pipe(gulp.dest('./dist/'));
//   }
//
//   // 复制图片文件
//   static images() {
//     return gulp.src('./src/images/*.*')
//       .pipe(gulp.dest('./dist/images/'));
//   }
//
//   // 编译 scss 文件
//   static sass() {
//     return gulp.src(scssPath)
//       .pipe(sass())
//       .pipe(autoprefixer({
//         browsers: ['last 2 versions', 'IE >= 8'],
//         cascade: false
//       }))
//       .pipe(cleanCSS({ compatibility: 'ie8' }))
//       .pipe(gulp.dest('./dist/css/'));
//   }
// }

const tsPath = 'src/**/*.@(tsx|ts)';
const cssPath = 'src/**/*.@(scss|css)';

const tsProject = ts.createProject('tsconfig.json');

export function tsCompile() {
  const rs = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return merge([
    rs.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist/js')),
    // rs.js.pipe(gulp.dest('dist')),
    rs.dts.pipe(gulp.dest('dist/dts'))
  ]);
}

export function cssMove() {
  return gulp.src(cssPath).pipe(gulp.dest('dist/js'))
}

// 监视 src 目录下所有 ts，一旦变化则编译
export function watch() {
  gulp.watch(tsPath, gulp.parallel(tsCompile));
  gulp.watch(cssPath, gulp.parallel(cssMove));
}

gulp.task('default', gulp.series(tsCompile, cssMove, watch));
