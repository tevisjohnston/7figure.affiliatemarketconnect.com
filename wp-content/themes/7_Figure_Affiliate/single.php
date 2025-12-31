<?php
/**
 * Single Blog Post Template
 * 7 Figure Affiliate Theme
 */

get_header();
?>

<div class="site-content">

    <?php
    while (have_posts()) {
        the_post();
        $categories = get_the_category();
        $tags = get_the_tags();
    ?>

    <!-- Hero Section -->
    <section class="post-hero bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16 px-6">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-2 mb-4 text-sm">
                <span><?php echo esc_html(get_the_date()); ?></span>
                <span>•</span>
                <span><?php esc_html_e('By', '7-figure-affiliate'); ?> <?php the_author(); ?></span>
                <?php if ($categories) : ?>
                    <span>•</span>
                    <?php foreach ($categories as $category) : ?>
                        <a href="<?php echo esc_url(get_category_link($category->term_id)); ?>" class="hover:text-amber-400 transition">
                            <?php echo esc_html($category->name); ?>
                        </a>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold mb-6"><?php the_title(); ?></h1>

            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail rounded-lg overflow-hidden mt-8">
                    <?php the_post_thumbnail('large', array('class' => 'w-full h-auto')); ?>
                </div>
            <?php endif; ?>
        </div>
    </section>

    <!-- Content Section -->
    <section class="post-content py-16 px-6 bg-white">
        <div class="max-w-4xl mx-auto">
            <div class="prose prose-lg max-w-none text-slate-700">
                <?php the_content(); ?>
            </div>

            <?php if ($tags) : ?>
                <div class="post-tags mt-8 pt-6 border-t border-slate-200">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-sm font-bold text-slate-700"><?php esc_html_e('Tags:', '7-figure-affiliate'); ?></span>
                        <?php foreach ($tags as $tag) : ?>
                            <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" class="tfaf-badge tfaf-badge-tag hover:bg-slate-300 transition">
                                <?php echo esc_html($tag->name); ?>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </section>

    <!-- Author Bio Section -->
    <section class="author-bio py-16 px-6 bg-slate-50">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-8 text-slate-900"><?php esc_html_e('About the Author', '7-figure-affiliate'); ?></h2>

            <div class="bg-white rounded-lg p-8 flex gap-6 items-start">
                <div class="flex-shrink-0">
                    <?php echo get_avatar(get_the_author_meta('ID'), 96, '', '', array('class' => 'rounded-full')); ?>
                </div>
                <div class="flex-1">
                    <h3 class="text-xl font-bold text-slate-900 mb-2">
                        <?php the_author(); ?>
                    </h3>
                    <?php if (get_the_author_meta('description')) : ?>
                        <div class="text-slate-700 mb-4">
                            <?php echo wpautop(wp_kses_post(get_the_author_meta('description'))); ?>
                        </div>
                    <?php else : ?>
                        <p class="text-slate-700 mb-4">
                            <?php
                            printf(
                                esc_html__('%s is a contributor to 7 Figure Affiliate, sharing insights on affiliate marketing and online business strategies.', '7-figure-affiliate'),
                                get_the_author()
                            );
                            ?>
                        </p>
                    <?php endif; ?>
                    <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>" class="text-amber-500 hover:text-amber-600 font-semibold transition">
                        <?php esc_html_e('View all posts by', '7-figure-affiliate'); ?> <?php the_author(); ?> →
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Related Posts Section -->
    <?php
    $related_posts = Theme_7_Figure_Affiliate_get_related_posts(get_the_ID(), 3);
    if ($related_posts->have_posts()) :
    ?>
    <section class="related-posts py-16 px-6 bg-white">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold mb-8 text-slate-900"><?php esc_html_e('Related Articles', '7-figure-affiliate'); ?></h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <?php
                while ($related_posts->have_posts()) {
                    $related_posts->the_post();
                    ?>
                    <article class="bg-white border border-slate-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                        <?php if (has_post_thumbnail()) : ?>
                            <div class="post-thumbnail h-48 overflow-hidden">
                                <a href="<?php the_permalink(); ?>" class="block w-full h-full">
                                    <?php the_post_thumbnail('medium', array('class' => 'w-full h-full object-cover')); ?>
                                </a>
                            </div>
                        <?php endif; ?>

                        <div class="p-6">
                            <h3 class="text-lg font-bold text-slate-900 mb-2">
                                <a href="<?php the_permalink(); ?>" class="hover:text-amber-500 transition">
                                    <?php the_title(); ?>
                                </a>
                            </h3>

                            <div class="text-xs text-slate-600 mb-3">
                                <?php echo esc_html(get_the_date()); ?>
                            </div>

                            <div class="text-slate-700 text-sm mb-4 line-clamp-3">
                                <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                            </div>

                            <a href="<?php the_permalink(); ?>" class="text-amber-500 hover:text-amber-600 font-semibold text-sm transition">
                                <?php esc_html_e('Read More →', '7-figure-affiliate'); ?>
                            </a>
                        </div>
                    </article>
                    <?php
                }
                wp_reset_postdata();
                ?>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Social Sharing Section -->
    <section class="social-sharing py-12 px-6 bg-slate-50">
        <div class="max-w-4xl mx-auto">
            <h3 class="text-lg font-bold text-slate-900 mb-4 text-center"><?php esc_html_e('Share This Article', '7-figure-affiliate'); ?></h3>

            <div class="flex justify-center gap-4">
                <?php
                $post_url = urlencode(get_permalink());
                $post_title = urlencode(get_the_title());
                ?>

                <!-- Facebook -->
                <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $post_url; ?>"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                   aria-label="<?php esc_attr_e('Share on Facebook', '7-figure-affiliate'); ?>">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                    </svg>
                </a>

                <!-- Twitter/X -->
                <a href="https://twitter.com/intent/tweet?url=<?php echo $post_url; ?>&text=<?php echo $post_title; ?>"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition"
                   aria-label="<?php esc_attr_e('Share on Twitter', '7-figure-affiliate'); ?>">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
                    </svg>
                </a>

                <!-- LinkedIn -->
                <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo $post_url; ?>&title=<?php echo $post_title; ?>"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
                   aria-label="<?php esc_attr_e('Share on LinkedIn', '7-figure-affiliate'); ?>">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </a>

                <!-- Email -->
                <a href="mailto:?subject=<?php echo $post_title; ?>&body=<?php esc_html_e('Check out this article:', '7-figure-affiliate'); ?> <?php echo $post_url; ?>"
                   class="flex items-center justify-center w-12 h-12 rounded-full bg-slate-600 text-white hover:bg-slate-700 transition"
                   aria-label="<?php esc_attr_e('Share via Email', '7-figure-affiliate'); ?>">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </a>
            </div>
        </div>
    </section>

    <!-- Email Signup CTA -->
    <?php
    set_query_var('email_signup_title', 'Want More Insider Strategies?');
    set_query_var('email_signup_description', 'Join thousands of entrepreneurs getting Michael Cheney\'s exclusive 7-figure affiliate marketing secrets delivered to their inbox.');
    set_query_var('email_signup_button', 'Get Free Access');
    set_query_var('email_signup_style', 'cta');
    get_template_part('template-parts/email-signup-form');
    ?>

    <?php } // end while ?>

</div>

<?php get_footer(); ?>
