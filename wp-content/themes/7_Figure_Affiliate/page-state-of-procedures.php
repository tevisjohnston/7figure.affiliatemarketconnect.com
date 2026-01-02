<?php
/**
 * State of Procedures Page Template
 * 7 Figure Affiliate Theme
 */

get_header();
?>

<div class="site-content">

    <section class="cta-section bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16 px-6">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl font-bold mb-6">State of Procedures: Online Business</h1>
            <h2 class="text-2xl font-bold mb-6">Affiliate Marketing</h2>
            <p class="text-xl mb-8 text-slate-200">
                This is the state of procedures for an online business using automated affiliate marketing systems. It covers everything you need to know to get your online business up and running earning consistent income.
            </p>
            <div class="page-state-of-procedures-image">
                <?php
                if ($page-state-of-procedures_page && has_post_thumbnail($page-state-of-procedures_page->ID)) {
                    echo wp_get_attachment_image(get_post_thumbnail_id($page-state-of-procedures_page->ID), 'large', false, array('class' => 'rounded-lg shadow-lg'));
                } else {
                    echo '<div class="bg-slate-200 rounded-lg p-8 text-center"><p class="text-slate-500">State of Procedures: Online Business Cover</p></div>';
                }
                ?>
            </div>
        </div>
    </section>

</div>
<?php get_footer(); ?>