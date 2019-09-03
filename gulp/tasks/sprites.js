var gulp      = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename    = require('gulp-rename'),
    del       = require('del');

//step2: svgSprite(config) pipe process, i.e how should be organized the flowing sources through this pipe.
var config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css' //This is the file that first we created a sprite.css file to write the code loop(svg package code)
				}
			}
		}
	}
}

gulp.task('beginClean', function(){
	return del(['./app/temp/sprite/', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function(){
	return gulp.src('./app/assets/images/icons/**/*.svg') //sources which is giving to pipe where is our single svg files located.
		.pipe(svgSprite(config))					      //flows to svgSprite(config) pipe to perform certain tasks. 
		.pipe(gulp.dest('./app/temp/sprite/'));			  //output coming from svgSprite(config) pipe.
});

gulp.task('copySpriteGraphic', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

//copySpriteCss is depended on createSprite after working createSprite only copySpriteCSS works.to show dependencies we give['dependencies']
gulp.task('copySpriteCSS', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));

});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
	return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']); // keep in mind here declared task icon is depended(d) on ['d1', 'd2', ...'dn']. described task works simultaneously. in order to achieve ['d1'] to complete first

